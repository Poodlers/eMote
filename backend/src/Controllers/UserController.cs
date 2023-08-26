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
    private readonly DatabaseContext _context;


    public UserController(DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();
        this._dbModuloContentSet = _context.Set<ModuloContent>();
        this._dbExercicioSet = _context.Set<Exercicio>();


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
    [HttpPost("{user_code}/favorites", Name = "AddUserFavorite")]
    public async Task<ActionResult<Exercicio>> AddUserFavorite(String user_code, [FromBody] ExercicioDTO exercicioDTO)
    {
        var user = _dbUserSet.Where(user => user.Code == user_code)
        .Include(user => user.FavoriteExercises)
        .FirstOrDefault();

        var exercicio = _dbExercicioSet.Where(exercicio => exercicio.ExercicioFile == exercicioDTO.ExercicioFile).FirstOrDefault();        if (user == null)
        if(exercicio == null || user == null)
        {
            return StatusCode(
                404,
                "User or Exercicio not found"
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
     
        
        var newUser = new User
        {
            Code = user.Code,
            Password = user.Password,
            Role = user.Role
        };
        
        var Modulo1UserProgress = new ModuloUserProgress(_dbModuloContentSet
        .Where(m => m.ModuleNumberOrder == 1).FirstOrDefault()!
        );
        newUser.ModulosProgress.Add(Modulo1UserProgress);

        var Modulo2UserProgress = new ModuloUserProgress(_dbModuloContentSet
        .Where(m => m.ModuleNumberOrder == 2).FirstOrDefault()!
        );
        newUser.ModulosProgress.Add(Modulo2UserProgress);

        var Modulo3UserProgress = new ModuloUserProgress(_dbModuloContentSet
        .Where(m => m.ModuleNumberOrder == 3).FirstOrDefault()!
        );

        newUser.ModulosProgress.Add(Modulo3UserProgress);

        var Modulo4UserProgress = new ModuloUserProgress(_dbModuloContentSet
        .Where(m => m.ModuleNumberOrder == 4).FirstOrDefault()!
        );

        newUser.ModulosProgress.Add(Modulo4UserProgress);    

        _dbUserSet.Add(newUser);
      
        await _context.SaveChangesAsync();
        return Ok(newUser);
    }




}