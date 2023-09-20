using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/modulo-progress")]
public class UserModuloProgress : ControllerBase
{
    private readonly DbSet<User> _dbUserSet;
    private readonly DatabaseContext _context;


    public UserModuloProgress(DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();
    }

    [HttpGet("{user_code}/{modulo_id}", Name = "GetModuloProgress")]
    public ActionResult<ModuloUserProgress> Get(String user_code, int modulo_id)
    {
        var userProgressModulo = _dbUserSet.Where(user => user.Code == user_code)
        .Include(user => user.ModulosProgress.Where(m =>
         m.ModuloContent!.ModuleNumberOrder == modulo_id))
        .ThenInclude(submoduloProgress => submoduloProgress.SubModuleUserProgresses)
        .FirstOrDefault();
        if (userProgressModulo == null || userProgressModulo.ModulosProgress.Count == 0)
        {
            return StatusCode(
                404,
                "User or Modulo not found"
            );
        }

        return Ok(userProgressModulo.ModulosProgress[0]);
    }

    [HttpGet("{user_code}", Name = "GetAllUserProgress")]
    public ActionResult<List<ModuloUserProgress>> Get(String user_code)
    {
        var userProgressModulo = _dbUserSet.Where(user => user.Code == user_code)
        .Include(user => user.ModulosProgress)
        .ThenInclude(submoduloProgress => submoduloProgress.SubModuleUserProgresses)
        .FirstOrDefault();

        if (userProgressModulo == null)
        {
            return StatusCode(
                404,
                "User not found"
            );
        }

        return Ok(userProgressModulo.ModulosProgress);
    }


    [HttpPost("{user_code}/{modulo_id}/{submodulo_id}", Name = "SetSubModuloProgress")]
    public async Task<ActionResult<SubModuleUserProgress>> Set(String user_code, int modulo_id, int submodulo_id, [FromBody] ProgressDTO progressDTO)
    {
        var userProgressModulo = _dbUserSet.Where(user => user.Code == user_code)
        .Include(user => user.ModulosProgress.Where(m =>
         m.ModuloContent!.ModuleNumberOrder == modulo_id))
        .ThenInclude(submoduloProgress => submoduloProgress.SubModuleUserProgresses
        .Where(s => s.SubModule!.SubModuleNumberOrder == submodulo_id))
        .FirstOrDefault();
        if (userProgressModulo == null || userProgressModulo.ModulosProgress.Count == 0

        || userProgressModulo.ModulosProgress[0].SubModuleUserProgresses.Count == 0)
        {
            return StatusCode(
                404,
                "User, Modulo or SubModulo not found"
            );
        }
        string[] format = { "dd/MM/yyyy HH:mm:ss", "dd/MM/yyyy", "dd-MM-yyyy", "dd-MM-yyyy HH:mm:ss" };
        if (DateTime.TryParseExact(progressDTO.TimeStampInicio, format, null,
                               System.Globalization.DateTimeStyles.AllowWhiteSpaces |
                               System.Globalization.DateTimeStyles.AdjustToUniversal, out DateTime dataInicio))
        {
            userProgressModulo.ModulosProgress[0].SubModuleUserProgresses[0].DataInicio = dataInicio;
        }
        else
        {
            return StatusCode(401, "Invalid dataInicio");
        }
        if (DateTime.TryParseExact(progressDTO.TimeStampFim, format, null,
                              System.Globalization.DateTimeStyles.AllowWhiteSpaces |
                              System.Globalization.DateTimeStyles.AdjustToUniversal, out DateTime dataFim))
        {
            userProgressModulo.ModulosProgress[0].SubModuleUserProgresses[0].DataFim = dataFim;
        }
        else
        {
            return StatusCode(401, "Invalid dataFim");
        }

        if (progressDTO.TimeStampFim != null)
        {
            userProgressModulo.ModulosProgress[0].SubModuleUserProgresses[0].IsCompleted = true;
        }


        var userProgress = 0;
        foreach (SubModuleUserProgress subModuleUserProgress in userProgressModulo.ModulosProgress[0].SubModuleUserProgresses)
        {
            if (subModuleUserProgress.DataInicio == null)
            {
                break;
            }
            userProgress += 1;
        }
        userProgressModulo.ModulosProgress[0].UserProgress = userProgress / userProgressModulo.ModulosProgress[0].SubModuleUserProgresses.Count;

        await _context.SaveChangesAsync();


        return Ok(userProgressModulo.ModulosProgress[0]);
    }

    [HttpPost("{user_code}/{modulo_id}", Name = "SetModuloProgress")]
    public async Task<ActionResult<SubModuleUserProgress>> Set(String user_code, int modulo_id, [FromBody] ProgressDTO progressDTO)
    {
        var userProgressModulo = _dbUserSet.Where(user => user.Code == user_code)
        .Include(user => user.ModulosProgress.Where(m =>
         m.ModuloContent!.ModuleNumberOrder == modulo_id))
        .FirstOrDefault();
        if (userProgressModulo == null || userProgressModulo.ModulosProgress.Count == 0)
        {
            return StatusCode(
                404,
                "User or Modulo not found"
            );
        }
        string[] format = { "dd/MM/yyyy HH:mm:ss", "dd/MM/yyyy", "dd-MM-yyyy", "dd-MM-yyyy HH:mm:ss" };
        if (DateTime.TryParseExact(progressDTO.TimeStampInicio, format, null,
                              System.Globalization.DateTimeStyles.AllowWhiteSpaces |
                              System.Globalization.DateTimeStyles.AdjustToUniversal, out DateTime dataInicio))
        {
            userProgressModulo.ModulosProgress[0].DataInicio = dataInicio;
        }
        else
        {
            return StatusCode(401, "Invalid dataInicio");
        }
        if (DateTime.TryParseExact(progressDTO.TimeStampFim, format, null,
                              System.Globalization.DateTimeStyles.AllowWhiteSpaces |
                              System.Globalization.DateTimeStyles.AdjustToUniversal, out DateTime dataFim))
        {
            userProgressModulo.ModulosProgress[0].DataFim = dataFim;
        }
        else
        {
            return StatusCode(401, "Invalid dataFim");
        }
        if (progressDTO.TimeStampFim != null)
        {
            userProgressModulo.ModulosProgress[0].IsCompleted = true;
        }



        await _context.SaveChangesAsync();


        return Ok(userProgressModulo.ModulosProgress[0]);
    }



}