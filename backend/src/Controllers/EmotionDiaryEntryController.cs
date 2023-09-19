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

    public EmotionDiaryEntryController(DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();
        this._dbExercicioSet = _context.Set<Exercicio>();


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
            Reflexao = dto.Reflexao
        };

        user.EmotionDiaryEntries!.Add(newEntry);
        await _context.SaveChangesAsync();
        return Ok(newEntry);

    }




}