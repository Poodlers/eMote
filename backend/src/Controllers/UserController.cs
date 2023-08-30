using System.Linq.Expressions;

using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/user")]
public class UserController : ControllerBase
{
    private readonly DbSet<User> _dbUserSet;
    private readonly DbSet<ModuloContent> _dbModuloContentSet;

    private readonly DbSet<Exercicio> _dbExercicioSet;

    private readonly DbSet<ModuloUserProgress> _dbModuleProgressSet;
    private readonly DatabaseContext _context;

    private readonly ILogger<ExcelExportController> _logger;


    public UserController(ILogger<ExcelExportController> logger, DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();
        this._dbModuloContentSet = _context.Set<ModuloContent>();
        this._dbExercicioSet = _context.Set<Exercicio>();
        this._dbModuleProgressSet = _context.Set<ModuloUserProgress>();

        this._logger = logger;

    }

    [HttpGet(Name = "GetUsers")]
    public Dictionary<string, List<User>> Get()
    {
        return new Dictionary<string, List<User>>
        {

            ["users"] = _dbUserSet.ToList()
        };
    }

    [HttpGet("{user_code}", Name = "GetUser")]
    public ActionResult<User> Get(String user_code)
    {
        var user = _dbUserSet.Where(user => user.Code == user_code)
        .Include(user => user.ModulosProgress)
        .ThenInclude(submoduloProgress => submoduloProgress.SubModuleUserProgresses)
        .FirstOrDefault();

        if (user == null)
        {
            return StatusCode(
                404,
                "User not found"
            );
        }

        return Ok(user);
    }

    [HttpDelete("{user_code}", Name = "DeleteUser")]
    public async Task<ActionResult<User>> Delete(String user_code)
    {
        var user = _dbUserSet.Where(user => user.Code == user_code)
        .Include(user => user.FoodDiaryEntries)
        .Include(user => user.EmotionDiaryEntries)
        .Include(user => user.Accesses)
        .Include(user => user.FavoriteExercises)
        .Include(user => user.ModulosProgress)
        .ThenInclude(submoduloProgress => submoduloProgress.SubModuleUserProgresses)
        .FirstOrDefault();

        if (user == null)
        {
            return StatusCode(
                404,
                "User not found"
            );
        }

        //delete all the food diary entries
        foreach (var food_diary in user.FoodDiaryEntries)
        {
            _context.Remove(food_diary);
        }

        //delete all the emotion diary entries
        foreach (var emotion_diary in user.EmotionDiaryEntries)
        {
            _context.Remove(emotion_diary);
        }

        //delete all the accesses
        foreach (var access in user.Accesses!)
        {
            _context.Remove(access);
        }

        //delete all the favorite exercises
        foreach (var exercise in user.FavoriteExercises)
        {
            _context.Remove(exercise);
        }

        //delete all the submodules progress
        foreach (var modulo_progress in user.ModulosProgress)
        {
            foreach (var submodulo_progress in modulo_progress.SubModuleUserProgresses)
            {
                _context.Remove(submodulo_progress);
            }
            _context.Remove(modulo_progress);
        }

        _dbUserSet.Remove(user);

        await _context.SaveChangesAsync();

        return Ok(user);
    }

    [HttpGet("{user_code}/favorites", Name = "GetUserFavorites")]
    public ActionResult<List<Exercicio>> GetUserFavorites(String user_code)
    {
        var user = _dbUserSet.Where(user => user.Code == user_code)
        .Include(user => user.FavoriteExercises)
        .FirstOrDefault();

        if (user == null)
        {
            return StatusCode(
                404,
                "User not found"
            );
        }

        return Ok(user.FavoriteExercises);
    }

    [HttpGet("{user_code}/personal-page", Name = "GetUserEpisodes")]
    public ActionResult<PersonalPageInfo> GetUserEpisodes(String user_code)
    {
        var user = _dbUserSet.Where(user => user.Code == user_code)
        .Include(user => user.FoodDiaryEntries)
        .Include(user => user.ModulosProgress)
        .ThenInclude(moduloProgress => moduloProgress.ModuloContent)
        .FirstOrDefault();

        if (user == null)
        {
            return StatusCode(
                404,
                "User not found"
            );
        }
        int last_x_days = 7;

        var user_food_diary = user.FoodDiaryEntries;
        //get the last x days of FoodDiaryEntries
        var last_x_days_food_diary = user_food_diary
        .Where(food_diary =>
        food_diary.Date >= DateOnly.FromDateTime(DateTime.Now.AddDays(-last_x_days))).ToList();

        var episodes = new List<EpisodesInfo>();

        var feelings = new List<SentimentosInfo>();

        var progressInfo = new List<ProgressInfo>();
        // group the food diary entries by date
        var grouped_food_diary = last_x_days_food_diary.GroupBy(food_diary => food_diary.Date)
        .OrderBy(group => group.Key);
        //for each group,  add up the number of episodes
        var last_date = DateOnly.FromDateTime(DateTime.Now.AddDays(-last_x_days));
        for (int i = 0; i < last_x_days; i++)
        {
            var group = grouped_food_diary.Where(group => group.Key == last_date).FirstOrDefault();
            if (group == null)
            {
                episodes.Add(new EpisodesInfo
                {
                    Date = last_date,
                    Episodes = 0
                });

            }
            else
            {
                // add the number of feelings in each of the food_diaries in the feelings list
                foreach (var food_diary in group)
                {
                    var food_diary_feelings = food_diary.FeelingsAroundMeal;
                    foreach (var feeling in food_diary_feelings)
                    {
                        var feeling_info = feelings.Where(feeling_info => feeling_info.Sentimento == feeling).FirstOrDefault();
                        if (feeling_info == null)
                        {
                            feelings.Add(new SentimentosInfo
                            {
                                Sentimento = feeling,
                                Count = 1
                            });
                        }
                        else
                        {
                            feeling_info.Count = feeling_info.Count! + 1;
                        }
                    }


                }

                var total_episodes = group.Sum(food_diary => (bool)food_diary.HadAnEpisode! ? 1 : 0);
                episodes.Add(
                    new EpisodesInfo
                    {
                        Date = last_date,
                        Episodes = total_episodes
                    }
                );
            }
            last_date = last_date.AddDays(1);
        }

        // get the progress of each module
        var modulos_progress = user.ModulosProgress;
        foreach (var modulo_progress in modulos_progress)
        {
            var modulo_progress_info = new ProgressInfo
            {
                ModuloNumberOrder = modulo_progress.ModuloContent!.ModuleNumberOrder,
                UserProgress = modulo_progress.UserProgress
            };
            progressInfo.Add(modulo_progress_info);
        }

        return Ok(new PersonalPageInfo
        {
            EpisodesInfo = episodes,
            SentimentosInfo = feelings,
            ProgressInfo = progressInfo
        });
    }

    [HttpPost("{user_code}/favorites", Name = "AddUserFavorite")]
    public async Task<ActionResult<Exercicio>> AddUserFavorite(String user_code, [FromBody] ExercicioDTO exercicioDTO)
    {
        var user = _dbUserSet.Where(user => user.Code == user_code)
        .Include(user => user.FavoriteExercises)
        .FirstOrDefault();



        var exercicio = _dbExercicioSet.Where(exercicio => exercicio.ExercicioFile == exercicioDTO.ExercicioFile).FirstOrDefault(); if (user == null)
            if (exercicio == null || user == null)
            {
                return StatusCode(
                    404,
                    "User or Exercicio not found"
                );
            }

        if (user.FavoriteExercises.Where(exercicio => exercicio.ExercicioFile == exercicioDTO.ExercicioFile).Any())
        {
            return StatusCode(
                401,
                "User already has this exercise as favorite"
            );
        }

        user.FavoriteExercises.Add(exercicio!);

        await _context.SaveChangesAsync();

        return Ok(exercicio);
    }

    [HttpGet("{user_code}/has-access", Name = "HasAccessToApp")]
    public ActionResult<bool> HasAccessToApp(String user_code)
    {
        var user = _dbUserSet.Where(user => user.Code == user_code)
        .FirstOrDefault();

        if (user == null)
        {
            return StatusCode(
                404,
                "User not found"
            );
        }

        return Ok(user.HasAccessToApp);
    }



    [HttpPost(Name = "CreateUser")]
    public async Task<ActionResult<User>> CreateUser([FromBody] UserDTO user)
    {

        var findUser = _dbUserSet

        .Where(u => u.Code == user.Code).FirstOrDefault();
        if (findUser != null)
        {
            return StatusCode(401, "User already exists");
        }

        var newUser = new User
        {
            Code = user.Code,
            Password = user.Password,
            Role = user.Role
        };

        string[] format = { "dd/MM/yyyy HH:mm:ss", "dd/MM/yyyy", "dd-MM-yyyy", "dd-MM-yyyy HH:mm:ss" };
        if (DateTime.TryParseExact(user.CreatedAt, format, null,
                               System.Globalization.DateTimeStyles.AllowWhiteSpaces |
                               System.Globalization.DateTimeStyles.AdjustToUniversal, out DateTime dataCriado))
        {
            newUser.CreatedAt = dataCriado;
        }
        else
        {
            return StatusCode(401, "Invalid dateOfCreation");
        }

        var modulo1Content = _dbModuloContentSet
        .Include(m => m.SubModules)
            .Where(m => m.ModuleNumberOrder == 1).FirstOrDefault()!;

        var subModulesModulo1 = new List<SubModuleUserProgress>();

        foreach (SubModule subModule in modulo1Content.SubModules)
        {
            var subModuleUserProgress = new SubModuleUserProgress
            {
                SubModule = subModule,
                DataInicio = null,
                DataFim = null
            };

            subModulesModulo1.Add(
                subModuleUserProgress
               );
        }


        var Modulo1UserProgress = new ModuloUserProgress
        {
            ModuloContent = modulo1Content,
            DataInicio = null,
            DataFim = null,
            Recompensa = "",
            Utilidade = 0,
            Satisfacao = 0,
            SubModuleUserProgresses = subModulesModulo1
        };

        _dbModuleProgressSet.Add(Modulo1UserProgress);
        await _context.SaveChangesAsync();

        newUser.ModulosProgress.Add(Modulo1UserProgress);

        var Modulo2Content = _dbModuloContentSet
        .Include(m => m.SubModules)
        .Where(m => m.ModuleNumberOrder == 2).FirstOrDefault()!;

        var subModulesModulo2 = new List<SubModuleUserProgress>();

        foreach (SubModule subModule in Modulo2Content.SubModules)
        {
            subModulesModulo2.Add(new SubModuleUserProgress
            {
                SubModule = subModule,
                DataInicio = null,
                DataFim = null
            });
        }

        var Modulo2UserProgress = new ModuloUserProgress
        {
            ModuloContent = Modulo2Content,
            DataInicio = null,
            DataFim = null,
            Recompensa = "",
            Utilidade = 0,
            Satisfacao = 0,
            SubModuleUserProgresses = subModulesModulo2
        };

        newUser.ModulosProgress.Add(Modulo2UserProgress);

        var Modulo3Content = _dbModuloContentSet
        .Include(m => m.SubModules)
        .Where(m => m.ModuleNumberOrder == 3).FirstOrDefault()!;

        var subModulesModulo3 = new List<SubModuleUserProgress>();

        foreach (SubModule subModule in Modulo3Content.SubModules)
        {
            subModulesModulo3.Add(new SubModuleUserProgress
            {
                SubModule = subModule,
                DataInicio = null,
                DataFim = null
            });
        }
        var Modulo3UserProgress = new ModuloUserProgress
        {
            ModuloContent = Modulo3Content,
            DataInicio = null,
            DataFim = null,
            Recompensa = "",
            Utilidade = 0,
            Satisfacao = 0,
            SubModuleUserProgresses = subModulesModulo3
        };


        newUser.ModulosProgress.Add(Modulo3UserProgress);

        var Modulo4Content = _dbModuloContentSet
        .Include(m => m.SubModules)
        .Where(m => m.ModuleNumberOrder == 4).FirstOrDefault()!;

        var subModulesModulo4 = new List<SubModuleUserProgress>();


        foreach (SubModule subModule in Modulo4Content.SubModules)
        {
            subModulesModulo4.Add(new SubModuleUserProgress
            {
                SubModule = subModule,
                DataInicio = null,
                DataFim = null
            });
        }

        var Modulo4UserProgress = new ModuloUserProgress
        {
            ModuloContent = Modulo4Content,
            DataInicio = null,
            DataFim = null,
            Recompensa = "",
            Utilidade = 0,
            Satisfacao = 0,
            SubModuleUserProgresses = subModulesModulo4
        };

        newUser.ModulosProgress.Add(Modulo4UserProgress);



        _dbUserSet.Add(newUser);

        await _context.SaveChangesAsync();
        return Ok(newUser);
    }




}