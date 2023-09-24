using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/modulo")]
public class ModuloController : ControllerBase
{
    private readonly DbSet<ModuloContent> _dbModuloContentSet;

    private readonly DbSet<User> _dbUserSet;

    private readonly DatabaseContext _context;


    public ModuloController(DatabaseContext context)
    {
        this._context = context;
        this._dbModuloContentSet = _context.Set<ModuloContent>();
        this._dbUserSet = _context.Set<User>();
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

    [HttpGet("{user_code}/{id}/{submodule_id}/{submodule_page_number}", Name = "GetSubModulePage")]
    public ActionResult<SubModulePageUserInfo> Get(string user_code, int id, int submodule_id, int submodule_page_number)
    {
        var subModuleUserProgress = _dbUserSet.Include(user =>
         user.ModulosProgress.Where(m => m.ModuloContent!.ModuleNumberOrder == id))
        .ThenInclude(modulo => modulo.SubModuleUserProgresses)
        .ThenInclude(submodulo => submodulo.SubModule)
        .ThenInclude(submodulopage => submodulopage!.SubModulePages)
        .Where(user => user.Code == user_code)
        .FirstOrDefault();


        if (subModuleUserProgress == null)
        {
            return StatusCode(
                404,
                "Modulo Not Found"

            );
        }
        var subModule = subModuleUserProgress.ModulosProgress[0]
            .SubModuleUserProgresses
            .Where(s => s.SubModule!.SubModuleNumberOrder == submodule_id).FirstOrDefault();

        if (subModule == null)
        {
            return StatusCode(
                404,
                "SubModule Not Found"

            );
        }
        var subModulePage = subModule
            .SubModule!.SubModulePages.Where(s => s.PageNumber == submodule_page_number).FirstOrDefault();

        if (subModulePage == null)
        {
            return StatusCode(
                404,
                "Page not Found"

            );
        }
        var isLastPage = false;
        var isLastPageInModulo = false;
        if (subModulePage.PageNumber == subModule.SubModule!.SubModulePages.Count)
        {
            isLastPage = true;
            if (subModule.SubModule!.SubModuleNumberOrder
            == subModuleUserProgress.ModulosProgress[0].SubModuleUserProgresses.Count)
            {
                isLastPageInModulo = true;
            }
        }



        var isBlocked = false;
        var previousSubModule = subModuleUserProgress.ModulosProgress[0]
            .SubModuleUserProgresses
            .Where(s => s.SubModule!.SubModuleNumberOrder == submodule_id - 1).FirstOrDefault();
        if (previousSubModule != null)
        {
            isBlocked = !previousSubModule.IsCompleted;
        }

        var submodulePageInfo = new SubModulePageUserInfo
        {
            SubModulePage = subModulePage,
            IsBlocked = isBlocked,
            IsLastPageInModulo = isLastPageInModulo,
            IsLastPage = isLastPage,
            SubModuleTitle = subModule.SubModule!.Title
        };

        return Ok(submodulePageInfo);
    }




}