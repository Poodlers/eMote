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


    public EmotionDiaryEntryController(DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();


    }

    [HttpGet(Name = "GetEmotionEntries")]
    public Dictionary<string, List<EmotionDiaryEntry>> Get(string code)
    {
        var user = _dbUserSet.Include("EmotionDiaryEntries").Where(u => u.Code == code).FirstOrDefault();
        var emotionDiaryEntries = new List<EmotionDiaryEntry>();
        if (user != null)
        {
           emotionDiaryEntries = user.EmotionDiaryEntries;
        }

         return new Dictionary<string, List<EmotionDiaryEntry>>
        {

            ["accesses"] = emotionDiaryEntries!
        };
    }
    

    [HttpPost(Name = "LogEmotionDiaryEntry")]
    public async Task<ActionResult<EmotionDiaryEntry>> LogAccess([FromBody] EmotionDiaryEntryDTO dto)
    {
        var user = _dbUserSet.Include("EmotionDiaryEntries").Where(u => u.Code == dto.UserCode).FirstOrDefault();
        if (user == null)
        {
            return StatusCode(401, "User not found");
        }
        var newEntry = new EmotionDiaryEntry
        {
            Date = dto.Date,
            Hour = dto.Hour,
            Sentimentos = dto.Sentimentos,
            Exercicios = dto.Exercicios,
            Reflexao = dto.Reflexao
        };
        
        user.EmotionDiaryEntries!.Add(newEntry);
        await _context.SaveChangesAsync();
        return Ok(newEntry);

    }




}