using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/emotion-diary")]
public class EmotionDiaryEntryController : ControllerBase
{
    private readonly DbSet<User> _dbUserSet;
    private readonly DatabaseContext _context;

    private readonly DbSet<Exercicio> _dbExercicioSet;

    private readonly ILogger<EmotionDiaryEntryController> _logger;

    public EmotionDiaryEntryController(DatabaseContext context, ILogger<EmotionDiaryEntryController> logger)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();
        this._dbExercicioSet = _context.Set<Exercicio>();
        _logger = logger;

    }

    [HttpGet("{user_code}", Name = "GetEmotionEntries")]
    public Dictionary<string, List<EmotionDiaryEntry>> Get(string user_code)
    {
        var user = _dbUserSet.
        Include(emotionDiary => emotionDiary.EmotionDiaryEntries)
        .ThenInclude(emotionDiaryEntry => emotionDiaryEntry.Exercicios).
        Where(u => u.Code == user_code).FirstOrDefault();
        var emotionDiaryEntries = new List<EmotionDiaryEntry>();
        if (user != null)
        {
            emotionDiaryEntries = user.EmotionDiaryEntries;
        }

        return new Dictionary<string, List<EmotionDiaryEntry>>
        {

            ["emotionDiaries"] = emotionDiaryEntries!
        };
    }

    [HttpGet("{user_code}/{date}", Name = "GetEmotionEntryDay")]
    public ActionResult<EmotionDiaryEntry> Get(string user_code, string date)
    {
        var user = _dbUserSet.
        Include(emotionDiary => emotionDiary.EmotionDiaryEntries)
        .ThenInclude(emotionDiaryEntry => emotionDiaryEntry.Exercicios).
        Where(u => u.Code == user_code).FirstOrDefault();

        if (user == null)
        {
            return StatusCode(401, "User not found");
        }

        DateOnly data;
        if (DateOnly.TryParse(date, out DateOnly dataOut))
        {
            data = dataOut;
        }
        else
        {
            return StatusCode(401, "Invalid date");
        }

        var emotionDiaryEntry = user.EmotionDiaryEntries.Where(emotionDiaryEntry
        => emotionDiaryEntry.Date == data).FirstOrDefault();

        if (emotionDiaryEntry == null)
        {
            return Ok(false);
        }
        else
        {
            return Ok(emotionDiaryEntry);
        }

    }

    [HttpPost("{user_code}", Name = "LogEmotionDiaryEntry")]
    public async Task<ActionResult<EmotionDiaryEntry>> LogAccess(string user_code, [FromBody] EmotionDiaryEntryDTO dto)
    {
        var user = _dbUserSet.Include("EmotionDiaryEntries").Where(u => u.Code == user_code).FirstOrDefault();
        if (user == null)
        {
            return StatusCode(401, "User not found");
        }


        DateOnly data;
        TimeOnly hora;
        if (DateOnly.TryParse(dto.Date, out DateOnly dataOut))
        {
            data = dataOut;
        }
        else
        {
            return StatusCode(401, "Invalid date");
        }

        if (TimeOnly.TryParse(dto.Hour, out TimeOnly timeOut))
        {
            hora = timeOut;
        }
        else
        {
            return StatusCode(401, "Invalid hora");
        }
        //get all exercises with the same fileNames present in the dto.Exercicios list

        var exercicios = _dbExercicioSet.ToList().Where(e =>
         dto.Exercicios.Find(exercicioDTO => exercicioDTO.ExercicioFile == e.ExercicioFile)
            != null
         ).ToList();

        var newEntry = new EmotionDiaryEntry
        {
            Date = data,
            Hour = hora,
            Sentimentos = dto.Sentimentos,
            Exercicios = exercicios,
            ReflexaoEmotion = dto.ReflexaoEmotion
        };

        user.EmotionDiaryEntries!.Add(newEntry);
        await _context.SaveChangesAsync();
        return Ok(newEntry);

    }
    [HttpGet("{user_code}/exercises-names", Name = "GetAllExercises")]
    public Dictionary<string, List<Exercicio>> GetExercises(string user_code)
    {
        var user = _dbUserSet
        .Include(user => user.ModulosProgress)
        .ThenInclude(modulo => modulo.SubModuleUserProgresses.Where(s => s.IsCompleted))
        .ThenInclude(submodulo => submodulo.SubModule)
        .ThenInclude(submodulo => submodulo!.SubModulePages)
        .ThenInclude(submodulopage => submodulopage.Exercicios)
        .Where(u => u.Code == user_code)
        .FirstOrDefault();

        if (user == null)
        {
            return new Dictionary<string, List<Exercicio>> { };
        }
        var completed_exercises = new List<Exercicio>();
        foreach (var modulo in user.ModulosProgress)
        {
            foreach (var submodulo in modulo.SubModuleUserProgresses)
            {
                foreach (var submodulopage in submodulo.SubModule!.SubModulePages)
                {
                    foreach (var exercicio in submodulopage.Exercicios)
                    {
                        completed_exercises.Add(exercicio);

                    }
                }
            }
        }



        var mindfulness_exercises = completed_exercises.Where(exercicio => exercicio.ModuloNumberOrder == 2).ToList();
        var emotion_regulation_exercises = completed_exercises.Where(exercicio => exercicio.ModuloNumberOrder == 3).ToList();
        var distress_tolerance_exercises = completed_exercises.Where(exercicio => exercicio.ModuloNumberOrder == 4).ToList();

        return new Dictionary<string, List<Exercicio>>
        {
            ["mindfulness"] = mindfulness_exercises,
            ["emotion_regulation"] = emotion_regulation_exercises,
            ["distress_tolerance"] = distress_tolerance_exercises!
        };
    }



}