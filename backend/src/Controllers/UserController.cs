using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/user")]
public class UserController : ControllerBase
{
    private readonly DbSet<User> _dbUserSet;
    private readonly DatabaseContext _context;


    public UserController(DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();


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

        _dbUserSet.Add(newUser);
      
        await _context.SaveChangesAsync();
        return Ok(newUser);
    }




}