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
    private readonly DatabaseContext _context;


    public UserController(DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();
        this._dbModuloContentSet = _context.Set<ModuloContent>();


    }

    [HttpGet(Name = "GetUsers")]
    public Dictionary<string, List<User>> Get()
    {
        return new Dictionary<string, List<User>>
        {

            ["users"] = _dbUserSet.ToList()
        };
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