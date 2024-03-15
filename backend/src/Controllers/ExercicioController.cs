using System.Linq.Expressions;

using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace backend.Controllers;

[ApiController]
[Route("/exercicio")]
public class ExercicioController : ControllerBase
{

    private readonly DbSet<Exercicio> _dbExercicioSet;

    private readonly DatabaseContext _context;

    private readonly ILogger<ExcelExportController> _logger;


    public ExercicioController(ILogger<ExcelExportController> logger, DatabaseContext context)
    {
        this._context = context;

        this._dbExercicioSet = _context.Set<Exercicio>();

        this._logger = logger;

    }

    [HttpGet(Name = "GetExercicios")]
    public Dictionary<string, List<Exercicio>> Get()
    {
        var exercicios = _dbExercicioSet.ToList();

        return new Dictionary<string, List<Exercicio>>
        {

            ["exercicios"] = exercicios
        };
    }

    [HttpGet("{id}", Name = "GetExercicio")]
    public ActionResult<Exercicio> Get(int id)
    {
        var exercicio = _dbExercicioSet.Where(u => u.Id == id).FirstOrDefault();
        if (exercicio == null)
        {
            return StatusCode(
                404,
                "Exercicio not found"

            );
        }

        return Ok(exercicio);
    }

    [HttpPost(Name = "AddExercicio")]
    public ActionResult<Exercicio> AddExercicio([FromBody] Exercicio exercicio)
    {
        _dbExercicioSet.Add(exercicio);
        _context.SaveChanges();
        return CreatedAtAction(nameof(Get), new { id = exercicio.Id }, exercicio);
    }

    // delete repeated exercicios
    [HttpDelete(Name = "DeleteExerciciosDuplicated")]
    public ActionResult<List<Exercicio>> DeleteExercicio()
    {
        // delete duplicated exercicios where the name is bigger
        var exercicios = _dbExercicioSet.ToList();
        var exerciciosToDelete = new List<Exercicio>();
        foreach (var exercicio in exercicios)
        {
            var duplicatedExercicios = _dbExercicioSet.Where(u => u.ModuloNumberOrder == exercicio.ModuloNumberOrder
            && u.SubModuleNumberOrder == exercicio.SubModuleNumberOrder
            && u.PageNumber == exercicio.PageNumber
             && u.Id != exercicio.Id).ToList();
            if (duplicatedExercicios.Count > 0)
            {
                if (exercicio.ExercicioName!.Length > duplicatedExercicios[0].ExercicioName!.Length)
                {
                    exerciciosToDelete.Add(exercicio);
                }
                else
                {
                    exerciciosToDelete.AddRange(duplicatedExercicios);
                }

            }
        }
        _dbExercicioSet.RemoveRange(exerciciosToDelete);
        _context.SaveChanges();
        return Ok(exerciciosToDelete);
    }

}