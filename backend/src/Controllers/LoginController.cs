using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/login")]
public class LoginController : ControllerBase
{
    private readonly DbSet<User> _dbUserSet;
    private readonly DatabaseContext _context;


    public LoginController(DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();


    }


    [HttpPost(Name = "LoginUser")]
    public async Task<ActionResult<User>> LoginUser(LoginDTO user)
    {

        var userFound = await _dbUserSet.
        Include(u => u.Accesses).
        FirstOrDefaultAsync(u => u.Code == user.Code
        && u.Password == user.Password);

        if (userFound == null)
        {
            return StatusCode(401, "User not found OR password incorrect");
        }
        return StatusCode(200, userFound);
    }




}