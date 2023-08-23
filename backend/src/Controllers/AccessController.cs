using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/access")]
public class AccessController : ControllerBase
{
    private readonly DbSet<User> _dbUserSet;
    private readonly DatabaseContext _context;


    public AccessController(DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();


    }

    [HttpGet(Name = "GetAccesses")]
    public Dictionary<string, List<Access>> Get(string code)
    {
        var user = _dbUserSet.Include("Accesses").Where(u => u.Code == code).FirstOrDefault();
        var accesses = new List<Access>();
        if (user != null)
        {
           accesses = user.Accesses;
        }

         return new Dictionary<string, List<Access>>
        {

            ["accesses"] = accesses!
        };
    }
    

    [HttpPost(Name = "LogAnAcess")]
    public async Task<ActionResult<Access>> LogAccess([FromBody] AccessDTO dto)
    {
        var user = _dbUserSet.Include("Accesses").Where(u => u.Code == dto.UserCode).FirstOrDefault();
        if (user == null)
        {
            return StatusCode(401, "User not found");
        }
        var newAccess = new Access
        {
            DataInicio = dto.DataInicio,
            DataFim = dto.DataFim
        };
        user.Accesses!.Add(newAccess);
        await _context.SaveChangesAsync();
        return Ok(newAccess);

    }




}