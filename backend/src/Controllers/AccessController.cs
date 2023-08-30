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

    [HttpGet("{user_code}", Name = "GetAccesses")]
    public Dictionary<string, List<Access>> Get(string user_code)
    {
        var user = _dbUserSet.Include("Accesses").Where(u => u.Code == user_code).FirstOrDefault();
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
        string[] format = { "dd/MM/yyyy HH:mm:ss", "dd/MM/yyyy" };


        var newAccess = new Access();
        if (DateTime.TryParseExact(dto.DataInicio, format, null,
                               System.Globalization.DateTimeStyles.AllowWhiteSpaces |
                               System.Globalization.DateTimeStyles.AdjustToUniversal, out DateTime dataInicio))
        {
            newAccess.DataInicio = dataInicio;
        }
        else
        {
            return StatusCode(401, "Invalid date");
        }
        if (DateTime.TryParseExact(dto.DataFim, format, null,
                               System.Globalization.DateTimeStyles.AllowWhiteSpaces |
                               System.Globalization.DateTimeStyles.AdjustToUniversal, out DateTime dataFim))
        {
            newAccess.DataFim = dataFim;
        }
        else
        {
            return StatusCode(401, "Invalid date");
        }


        user.Accesses!.Add(newAccess);
        await _context.SaveChangesAsync();
        return Ok(newAccess);

    }




}