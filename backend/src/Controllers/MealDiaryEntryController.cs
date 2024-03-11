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

    private readonly string[] _format_time;
    private readonly string[] _format_date;


    public MealDiaryEntryController(DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();
        this._format_date = new string[] { "dd/MM/yyyy", "dd-MM-yyyy" };
        this._format_time = new string[] { "HH:mm:ss" };


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

    [HttpGet("{user_code}/{date}/{refeicao}", Name = "GetDayEntries")]
    public ActionResult<MealDiaryEntry> GetDatesEntries(string user_code, string date, Refeicao refeicao)
    {
        var user = _dbUserSet.Include("FoodDiaryEntries").Where(u => u.Code == user_code).FirstOrDefault();
        if (user == null)
        {
            return StatusCode(401, "User not found");
        }


        DateOnly data;

        if (DateOnly.TryParseExact(date, this._format_date, out DateOnly dataOut))
        {
            data = dataOut;
        }
        else
        {
            return StatusCode(401, "Invalid date");
        }

        var mealDiaryEntries = user.FoodDiaryEntries.Where(e => e.Date == data && e.TipoRefeicao == refeicao).FirstOrDefault();
        if (mealDiaryEntries == null)
        {
            return Ok(false);
        }
        else
        {
            return Ok(mealDiaryEntries);
        }
    }




    [HttpPost("{user_code}", Name = "LogDiaryEntry")]
    public async Task<ActionResult<MealDiaryEntry>> LogAccess(string user_code, [FromBody] MealDiaryEntryDTO dto)
    {
        var user = _dbUserSet.Include("FoodDiaryEntries").Where(u => u.Code == user_code).FirstOrDefault();
        if (user == null)
        {
            return StatusCode(401, "User not found");
        }



        DateOnly data;
        TimeOnly hora;
        TimeOnly hora_refeicao;

        if (DateOnly.TryParseExact(dto.Date, this._format_date, out DateOnly dataOut))
        {
            data = dataOut;
        }
        else
        {
            return StatusCode(401, "Invalid date");
        }

        if (TimeOnly.TryParseExact(dto.Hour, this._format_time, out TimeOnly timeOut))
        {
            hora = timeOut;
        }
        else
        {
            return StatusCode(401, "Invalid hora");
        }

        if (TimeOnly.TryParseExact(dto.TimeOfMeal, this._format_time, out TimeOnly timeOfMealOut))
        {
            hora_refeicao = timeOfMealOut;
        }
        else if (dto.SkippedMeal)
        {
            hora_refeicao = new TimeOnly(0, 0, 0);
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
            TimeOfMeal = hora_refeicao == new TimeOnly(0, 0, 0) ? null : hora_refeicao,
            FeelingsAroundMeal = dto.FeelingsAroundMeal,
            ContentsOfMeal = dto.ContentsOfMeal,
            PlainAttention = dto.PlainAttention,
            Location = dto.Location,
            MealCompany = dto.MealCompany,
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