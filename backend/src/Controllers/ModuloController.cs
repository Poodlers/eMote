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

    [HttpPost("{modulo_id}", Name = "AddSubModule")]
    public ActionResult<SubModule> AddSubModule(int modulo_id, [FromBody] SubModule subModule)
    {
        var modulo = _dbModuloContentSet.Include(modulo => modulo.SubModules)
        .Where(u => u.ModuleNumberOrder == modulo_id)
        .FirstOrDefault();
        if (modulo == null)
        {
            return StatusCode(
                404,
                "Modulo not found"

            );
        }
        modulo.SubModules.Add(subModule);
        _context.SaveChanges();
        return Ok(subModule);
    }

    [HttpPost("{modulo_id}/{submodule_id}/{page_number}", Name = "FixSubModulePage")]
    public ActionResult<SubModulePage> FixSubModulePage(int modulo_id, int submodule_id,
    int page_number, [FromBody] SubModulePage subModulePage)
    {
        var modulo = _dbModuloContentSet.Include(modulo => modulo.SubModules)
        .ThenInclude(submodulo => submodulo.SubModulePages)
        .ThenInclude(submodulopage => submodulopage.Exercicios)
        .Where(u => u.ModuleNumberOrder == modulo_id)
        .FirstOrDefault();
        if (modulo == null)
        {
            return StatusCode(
                404,
                "Modulo not found"

            );
        }
        var subModule = modulo.SubModules.Where(s => s.SubModuleNumberOrder == submodule_id).FirstOrDefault();
        if (subModule == null)
        {
            return StatusCode(
                404,
                "SubModule not found"

            );
        }
        var subModulePageToFix = subModule.SubModulePages
        .Where(s => s.PageNumber == page_number).FirstOrDefault();
        if (subModulePageToFix == null)
        {
            return StatusCode(
                404,
                "SubModulePage not found"

            );
        }
        if (subModulePage.Text != null)
        {
            subModulePageToFix.Text = subModulePage.Text;
        }
        subModulePageToFix.Exercicios = subModulePage.Exercicios;
        _context.SaveChanges();
        return Ok(subModulePageToFix);
    }


    [HttpGet("{user_code}/modulo-blocked", Name = "GetModuloBlockInfo")]
    public ActionResult<List<ModuloBlockInfo>> GetModuloBlockInfo(string user_code)
    {
        var user = _dbUserSet.Include(user => user.ModulosProgress)
        .ThenInclude(modulo => modulo.ModuloContent)
        .Where(u => u.Code == user_code)
        .FirstOrDefault();
        if (user == null)
        {
            return StatusCode(
                404,
                "User not found"

            );
        }
        var isBlocked = false;
        var moduloBlockInfo = new List<ModuloBlockInfo>();
        foreach (var moduloProgress in user.ModulosProgress)
        {
            var previousModulo = user.ModulosProgress
            .Where(m => m.ModuloContent!.ModuleNumberOrder == moduloProgress.ModuloContent!.ModuleNumberOrder - 1)
            .FirstOrDefault();
            if (previousModulo != null)
            {
                isBlocked = !previousModulo.IsCompleted;
            }
            var isStarted = moduloProgress.DataInicio != null;
            moduloBlockInfo.Add(new ModuloBlockInfo
            {
                ModuloNumberOrder = moduloProgress.ModuloContent!.ModuleNumberOrder,
                ModuloTitle = moduloProgress.ModuloContent!.Title,
                IsBlocked = isBlocked,
                IsStarted = isStarted,
            });
        }

        return Ok(moduloBlockInfo);

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
        .ThenInclude(modulo => modulo.SubModuleUserProgresses
        .OrderBy(s => s.SubModule!.SubModuleNumberOrder))
        .ThenInclude(submodulo => submodulo.SubModule)
        .ThenInclude(submodulopage => submodulopage!.SubModulePages)
        .ThenInclude(submodulepage => submodulepage.Exercicios)
        .Where(user => user.Code == user_code)
        .Include(user => user.FavoriteExercises)
        .FirstOrDefault();


        if (subModuleUserProgress == null)
        {
            return StatusCode(
                404,
                "Modulo Not Found"

            );
        }
        var subModule = subModuleUserProgress.ModulosProgress[0]
            .SubModuleUserProgresses[submodule_id - 1];
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
            if (submodule_id
            == subModuleUserProgress.ModulosProgress[0].SubModuleUserProgresses.Count)
            {
                isLastPageInModulo = true;
            }
        }



        var isBlocked = false;
        try
        {
            var previousSubModule = subModuleUserProgress.ModulosProgress[0]
            .SubModuleUserProgresses.ElementAt(submodule_id - 2);
            if (previousSubModule != null)
            {
                isBlocked = !previousSubModule.IsCompleted;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        var exerciciosFavoritos = new List<ExercicioDTO>();
        foreach (var exercicioInPage in subModulePage.Exercicios)
        {
            var exercicioFavorito = subModuleUserProgress.FavoriteExercises
            .Where(e => e!.Id == exercicioInPage!.Id).FirstOrDefault();
            if (exercicioFavorito != null)
            {
                exerciciosFavoritos.Add(new ExercicioDTO
                {
                    ExercicioFile = exercicioFavorito.ExercicioFile,
                    ExercicioIsFavorite = true,
                });
            }
            else
            {
                exerciciosFavoritos.Add(new ExercicioDTO
                {
                    ExercicioFile = exercicioInPage!.ExercicioFile,
                    ExercicioIsFavorite = false,
                });
            }
        }

        var submodulePageInfo = new SubModulePageUserInfo
        {
            SubModulePage = subModulePage,
            IsBlocked = isBlocked,
            IsLastPageInModulo = isLastPageInModulo,
            IsLastPage = isLastPage,
            SubModuleTitle = subModule.SubModule!.Title,
            ExerciciosFavoritos = exerciciosFavoritos
        };

        return Ok(submodulePageInfo);
    }




}