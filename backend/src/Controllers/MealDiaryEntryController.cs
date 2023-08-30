using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/meal-diary")]
public class MealDiaryEntryController : ControllerBase
{
    private readonly DbSet<User> _dbUserSet;
    private readonly DatabaseContext _context;


    public MealDiaryEntryController(DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();


    }

    [HttpGet("{user_code}", Name = "GetEntries")]
    public Dictionary<string, List<MealDiaryEntry>> Get(string user_code)
    {
        var user = _dbUserSet.Include("FoodDiaryEntries").Where(u => u.Code == user_code).FirstOrDefault();
        var mealDiaryEntries = new List<MealDiaryEntry>();
        if (user != null)
        {
            mealDiaryEntries = user.FoodDiaryEntries;
        }

        return new Dictionary<string, List<MealDiaryEntry>>
        {

            ["mealDiaries"] = mealDiaryEntries!
        };
    }


    [HttpPost(Name = "LogDiaryEntry")]
    public async Task<ActionResult<MealDiaryEntry>> LogAccess([FromBody] MealDiaryEntryDTO dto)
    {
        var user = _dbUserSet.Include("FoodDiaryEntries").Where(u => u.Code == dto.UserCode).FirstOrDefault();
        if (user == null)
        {
            return StatusCode(401, "User not found");
        }

        string[] formatDate = { "M/d/yyyy", "M-d-yyyy" };
        string[] formatHours = { "HH:mm:ss", "HH:mm" };
        DateOnly data;
        TimeOnly hora;
        TimeOnly hora_refeicao;
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

        if (TimeOnly.TryParse(dto.TimeOfMeal, out TimeOnly timeOfMealOut))
        {
            hora_refeicao = timeOfMealOut;
        }
        else
        {
            return StatusCode(401, "Invalid hora_refeicao");
        }

        var newEntry = new MealDiaryEntry
        {
            Date = data,
            Hour = hora,
            TipoRefeicao = dto.TipoRefeicao,
            SkippedMeal = dto.SkippedMeal,
            TimeOfMeal = hora_refeicao,
            FeelingsAroundMeal = dto.FeelingsAroundMeal,
            ContentsOfMeal = dto.ContentsOfMeal,
            PlainAttention = dto.PlainAttention,
            RestrainedConsumption = dto.RestrainedConsumption,
            HadAnEpisode = dto.HadAnEpisode,
            HadCompensatoryBehaviour = dto.HadCompensatoryBehaviour,
            CompensatoryBehaviors = dto.CompensatoryBehaviors,
            Reflexao = dto.Reflexao

        };

        user.FoodDiaryEntries!.Add(newEntry);
        await _context.SaveChangesAsync();
        return Ok(newEntry);

    }




}