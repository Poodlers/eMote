using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/modulo")]
public class ModuloController : ControllerBase
{
    private readonly DbSet<ModuloContent> _dbModuloContentSet;
    private readonly DatabaseContext _context;


    public ModuloController(DatabaseContext context)
    {
        this._context = context;
        this._dbModuloContentSet = _context.Set<ModuloContent>();
    }

    [HttpGet("{id}", Name = "GetModulo")]
    public ActionResult<ModuloContent> Get(int id)
    {
        var modulo = _dbModuloContentSet.Include(modulo => modulo.SubModules)
        .ThenInclude(submodulo => submodulo.SubModulePages)
        .ThenInclude(submodulopage => submodulopage.Exercicios)
        .Where(u => u.ModuleNumberOrder == id)
        .FirstOrDefault();
        if (modulo == null)
        {
            return StatusCode(
                404,
                "Modulo not found"

            );
        }

        return Ok(modulo);
    }

    [HttpGet("{id}/{submodule_id}", Name = "GetSubModule")]
    public ActionResult<SubModule> Get(int id, int submodule_id)
    {
        var modulo = _dbModuloContentSet.Include(modulo => modulo.SubModules.Where(s => s.SubModuleNumberOrder == submodule_id))
        .ThenInclude(submodulo => submodulo.SubModulePages)
        .ThenInclude(submodulopage => submodulopage.Exercicios)
        .Where(u => u.ModuleNumberOrder == id)
        .FirstOrDefault();
        if (modulo == null)
        {
            return StatusCode(
                404,
                "SubModule not found"

            );
        }

        return Ok(modulo);
    }

    [HttpGet("{id}/{submodule_id}/{submodule_page_number}", Name = "GetSubModulePage")]
    public ActionResult<SubModulePage> Get(int id, int submodule_id, int submodule_page_number)
    {
        var modulo = _dbModuloContentSet.Include(modulo => modulo.SubModules.Where(s => s.SubModuleNumberOrder == submodule_id))
        .ThenInclude(submodulo => submodulo.SubModulePages.Where(s => s.PageNumber == submodule_page_number))
        .ThenInclude(submodulopage => submodulopage.Exercicios)
        .Where(u => u.ModuleNumberOrder == id)
        .FirstOrDefault();
        if (modulo == null)
        {
            return StatusCode(
                404,
                "SubModulePage not found"

            );
        }
        if (modulo.SubModules.FirstOrDefault()?.SubModulePages.FirstOrDefault() == null)
        {
            return StatusCode(
                404,
                "SubModulePage not found"

            );
        }

        return Ok(modulo.SubModules.FirstOrDefault()?.SubModulePages.FirstOrDefault());
    }




}