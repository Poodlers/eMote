namespace backend.Controllers;

using System.Data;

using backend.Models;

using ClosedXML.Excel;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/excel")]
public class ExcelExportController : ControllerBase
{

    private readonly DbSet<User> _dbUserSet;

    private readonly ILogger<ExcelExportController> _logger;
    private readonly DatabaseContext _context;


    public ExcelExportController(ILogger<ExcelExportController> logger, DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();
        this._logger = logger;

    }

    [HttpGet(Name = "ExcelExport")]
    public async Task<FileResult?> ExportDbExcel()
    {
        var users = await _dbUserSet.ToListAsync();
        var filename = "database_emotE.xlsx";
        try
        {
            return GenerateExcel(filename, users);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return null;
        }

    }

    private FileResult GenerateExcel(string filename, IEnumerable<User> users)
    {
        DataTable dataTableUser = new DataTable("Users");

        dataTableUser.Columns.AddRange(new DataColumn[3] {
            new DataColumn("Code", typeof(string)),
            new DataColumn("Password", typeof(string)),
            new DataColumn("Role", typeof(int)),
        });

        DataTable dataTableAcessos = new DataTable("Accessos");

        dataTableAcessos.Columns.AddRange(new DataColumn[3] {
            new DataColumn("cod_user", typeof(string)),
            new DataColumn("data_inicio", typeof(DateTime)),
            new DataColumn("data_fim", typeof(DateTime)),
        });

        DataTable dataTableEmotionDiary = new DataTable("EmotionDiary");

        dataTableEmotionDiary.Columns.AddRange(new DataColumn[6] {
            new DataColumn("cod_user", typeof(string)),
            new DataColumn("data", typeof(DateOnly)),
            new DataColumn("hora_sistema", typeof(TimeOnly)),
            new DataColumn("sentimento", typeof(string)),
            new DataColumn("exercicios", typeof(string)),
            new DataColumn("reflexao", typeof(string)),

        });

        DataTable dataTableMealDiary = new DataTable("MealDiary");

        dataTableMealDiary.Columns.AddRange(new DataColumn[15] {
            new DataColumn("cod_user", typeof(string)),
            new DataColumn("data", typeof(DateOnly)),
            new DataColumn("hora_sistema", typeof(TimeOnly)),
            new DataColumn("hora_refeicao", typeof(TimeOnly)),
            new DataColumn("tipo_refeicao", typeof(string)),
            new DataColumn("perg1", typeof(bool)),
            new DataColumn("perg2", typeof(TimeOnly)),
            new DataColumn("perg3", typeof(string)),
            new DataColumn("perg4", typeof(string)),
            new DataColumn("perg5", typeof(bool)),
            new DataColumn("perg6", typeof(bool)),
            new DataColumn("perg7", typeof(bool)),
            new DataColumn("perg8", typeof(bool)),
            new DataColumn("perg8_opcoes", typeof(string)),
            new DataColumn("perg9", typeof(string)),

        });

        DataTable dataTableModulo1UserProgress = new DataTable("Modulo 1 - Progresso");

        dataTableModulo1UserProgress.Columns.AddRange(new DataColumn[21] {
            new DataColumn("cod_user", typeof(string)),
            new DataColumn("data_inicio", typeof(DateTime)),
            new DataColumn("data_fim", typeof(DateTime)),
            new DataColumn("sub_mod1_inicio", typeof(DateTime)),
            new DataColumn("sub_mod1_fim", typeof(DateTime)),
            new DataColumn("sub_mod2_inicio", typeof(DateTime)),
            new DataColumn("sub_mod2_fim", typeof(DateTime)),
            new DataColumn("sub_mod3_inicio", typeof(DateTime)),
            new DataColumn("sub_mod3_fim", typeof(DateTime)),
            new DataColumn("sub_mod4_inicio", typeof(DateTime)),
            new DataColumn("sub_mod4_fim", typeof(DateTime)),
            new DataColumn("sub_mod5_inicio", typeof(DateTime)),
            new DataColumn("sub_mod5_fim", typeof(DateTime)),
            new DataColumn("sub_mod6_inicio", typeof(DateTime)),
            new DataColumn("sub_mod6_fim", typeof(DateTime)),
            new DataColumn("sub_mod7_inicio", typeof(DateTime)),
            new DataColumn("sub_mod7_fim", typeof(DateTime)),
            new DataColumn("favorito", typeof(string)),
            new DataColumn("recompensa", typeof(string)),
            new DataColumn("class_utilidade", typeof(int)),
            new DataColumn("class_satisfacao", typeof(int)),

        });

        DataTable dataTableModulo2UserProgress = new DataTable("Modulo 2 - Progresso");

        dataTableModulo2UserProgress.Columns.AddRange(new DataColumn[25] {
            new DataColumn("cod_user", typeof(string)),
            new DataColumn("data_inicio", typeof(DateTime)),
            new DataColumn("data_fim", typeof(DateTime)),
            new DataColumn("sub_mod1_inicio", typeof(DateTime)),
            new DataColumn("sub_mod1_fim", typeof(DateTime)),
            new DataColumn("sub_mod2_inicio", typeof(DateTime)),
            new DataColumn("sub_mod2_fim", typeof(DateTime)),
            new DataColumn("sub_mod3_inicio", typeof(DateTime)),
            new DataColumn("sub_mod3_fim", typeof(DateTime)),
            new DataColumn("sub_mod4_inicio", typeof(DateTime)),
            new DataColumn("sub_mod4_fim", typeof(DateTime)),
            new DataColumn("sub_mod5_inicio", typeof(DateTime)),
            new DataColumn("sub_mod5_fim", typeof(DateTime)),
            new DataColumn("sub_mod6_inicio", typeof(DateTime)),
            new DataColumn("sub_mod6_fim", typeof(DateTime)),
            new DataColumn("sub_mod7_inicio", typeof(DateTime)),
            new DataColumn("sub_mod7_fim", typeof(DateTime)),
            new DataColumn("sub_mod8_inicio", typeof(DateTime)),
            new DataColumn("sub_mod8_fim", typeof(DateTime)),
            new DataColumn("sub_mod9_inicio", typeof(DateTime)),
            new DataColumn("sub_mod9_fim", typeof(DateTime)),
            new DataColumn("favorito", typeof(string)),
            new DataColumn("recompensa", typeof(string)),
            new DataColumn("class_utilidade", typeof(int)),
            new DataColumn("class_satisfacao", typeof(int)),


        });

        DataTable dataTableModulo3UserProgress = new DataTable("Modulo 3 - Progresso");
        dataTableModulo3UserProgress.Columns.AddRange(new DataColumn[17] {
            new DataColumn("cod_user", typeof(string)),
            new DataColumn("data_inicio", typeof(DateTime)),
            new DataColumn("data_fim", typeof(DateTime)),
            new DataColumn("sub_mod1_inicio", typeof(DateTime)),
            new DataColumn("sub_mod1_fim", typeof(DateTime)),
            new DataColumn("sub_mod2_inicio", typeof(DateTime)),
            new DataColumn("sub_mod2_fim", typeof(DateTime)),
            new DataColumn("sub_mod3_inicio", typeof(DateTime)),
            new DataColumn("sub_mod3_fim", typeof(DateTime)),
            new DataColumn("sub_mod4_inicio", typeof(DateTime)),
            new DataColumn("sub_mod4_fim", typeof(DateTime)),
            new DataColumn("sub_mod5_inicio", typeof(DateTime)),
            new DataColumn("sub_mod5_fim", typeof(DateTime)),
            new DataColumn("favorito", typeof(string)),
            new DataColumn("recompensa", typeof(string)),
            new DataColumn("class_utilidade", typeof(int)),
            new DataColumn("class_satisfacao", typeof(int)),

        });

        DataTable dataTableModulo4UserProgress = new DataTable("Modulo 4 - Progresso");
        dataTableModulo4UserProgress.Columns.AddRange(new DataColumn[19] {
            new DataColumn("cod_user", typeof(string)),
            new DataColumn("data_inicio", typeof(DateTime)),
            new DataColumn("data_fim", typeof(DateTime)),
            new DataColumn("sub_mod1_inicio", typeof(DateTime)),
            new DataColumn("sub_mod1_fim", typeof(DateTime)),
            new DataColumn("sub_mod2_inicio", typeof(DateTime)),
            new DataColumn("sub_mod2_fim", typeof(DateTime)),
            new DataColumn("sub_mod3_inicio", typeof(DateTime)),
            new DataColumn("sub_mod3_fim", typeof(DateTime)),
            new DataColumn("sub_mod4_inicio", typeof(DateTime)),
            new DataColumn("sub_mod4_fim", typeof(DateTime)),
            new DataColumn("sub_mod5_inicio", typeof(DateTime)),
            new DataColumn("sub_mod5_fim", typeof(DateTime)),
            new DataColumn("sub_mod6_inicio", typeof(DateTime)),
            new DataColumn("sub_mod6_fim", typeof(DateTime)),
            new DataColumn("favorito", typeof(string)),
            new DataColumn("recompensa", typeof(string)),
            new DataColumn("class_utilidade", typeof(int)),
            new DataColumn("class_satisfacao", typeof(int)),

        });

        var userEnum = _dbUserSet
        .Include(user => user.FoodDiaryEntries)
        .Include(user => user.EmotionDiaryEntries)
        .ThenInclude(emotionDiary => emotionDiary.Exercicios)
        .Include(user => user.ModulosProgress)
        .ThenInclude(modulo => modulo.SubModuleUserProgresses
        .OrderBy(submodulo => submodulo.SubModule!.SubModuleNumberOrder))
        .ThenInclude(submodulo => submodulo.SubModule)
        .Include(user => user.ModulosProgress)
        .ThenInclude(modulo => modulo.ModuloContent)
        .Include(user => user.FavoriteExercises)
        .Include(user => user.Accesses).AsEnumerable();

        foreach (var user in userEnum)
        {
            if (user.ModulosProgress.Count < 1) continue;
            _logger.LogInformation($"Adding user {user.Code} to excel file");
            _logger.LogInformation($"Adding user with modulosProgress {user.ModulosProgress[0].SubModuleUserProgresses.Count} to excel file");
            dataTableUser.Rows.Add(user.Code, user.Password, user.Role);

            foreach (var access in user.Accesses!)
            {
                dataTableAcessos.Rows.Add(user.Code, access.DataInicio, access.DataFim);
            }

            foreach (var emotionDiary in user.EmotionDiaryEntries!)
            {

                var sentimentosString = "";
                foreach (var sentimento in emotionDiary.Sentimentos)
                {
                    sentimentosString = sentimentosString + sentimento.ToString() + ", \n "; ;
                }
                var exerciciosString = "";
                foreach (var exercicio in emotionDiary.Exercicios)
                {
                    exerciciosString = exerciciosString + exercicio.ExercicioName! + ", \n "; ;
                }

                dataTableEmotionDiary.Rows.Add(
                    user.Code, emotionDiary.Date,
                    emotionDiary.Hour, sentimentosString, exerciciosString, emotionDiary.ReflexaoEmotion);
            }

            foreach (var mealDiary in user.FoodDiaryEntries!)
            {
                var feelingsAroundMealString = "";
                foreach (var feeling in mealDiary.FeelingsAroundMeal)
                {
                    feelingsAroundMealString = feelingsAroundMealString + feeling.ToString() + ", \n ";
                }

                var compensatoryBehaviorsString = "";
                foreach (var behavior in mealDiary.CompensatoryBehaviors)
                {
                    compensatoryBehaviorsString = compensatoryBehaviorsString + behavior.ToString() + ", \n ";
                }

                dataTableMealDiary.Rows.Add(
                    user.Code, mealDiary.Date, mealDiary.Hour,
                    mealDiary.TimeOfMeal,
                    mealDiary.TipoRefeicao.ToString(),
                    mealDiary.SkippedMeal,
                    mealDiary.TimeOfMeal,
                    feelingsAroundMealString,
                    mealDiary.ContentsOfMeal,
                    mealDiary.PlainAttention,
                    mealDiary.RestrainedConsumption,
                    mealDiary.HadAnEpisode,
                    mealDiary.HadCompensatoryBehaviour,
                    compensatoryBehaviorsString,
                    mealDiary.Reflexao);

            }

            foreach (var moduloProgress in user.ModulosProgress!)
            {
                var fav_exercises_modulo = user.FavoriteExercises!.Where(e => e.ModuloNumberOrder == moduloProgress.ModuloContent!.ModuleNumberOrder).ToList();
                switch (moduloProgress.ModuloContent!.ModuleNumberOrder)
                {
                    case 1:
                        dataTableModulo1UserProgress.Rows.Add(AddRowsToModuloTable(moduloProgress, user.Code!, user.Role, fav_exercises_modulo));
                        break;
                    case 2:

                        dataTableModulo2UserProgress.Rows.Add(AddRowsToModuloTable(moduloProgress, user.Code!, user.Role, fav_exercises_modulo));
                        break;
                    case 3:

                        dataTableModulo3UserProgress.Rows.Add(AddRowsToModuloTable(moduloProgress, user.Code!, user.Role, fav_exercises_modulo));
                        break;
                    case 4:

                        dataTableModulo4UserProgress.Rows.Add(AddRowsToModuloTable(moduloProgress, user.Code!, user.Role, fav_exercises_modulo));
                        break;
                }
            }

        }

        using (XLWorkbook workbook = new XLWorkbook())
        {
            workbook.Worksheets.Add(dataTableUser);
            workbook.Worksheets.Add(dataTableAcessos);
            workbook.Worksheets.Add(dataTableEmotionDiary);
            workbook.Worksheets.Add(dataTableMealDiary);
            workbook.Worksheets.Add(dataTableModulo1UserProgress);
            workbook.Worksheets.Add(dataTableModulo2UserProgress);
            workbook.Worksheets.Add(dataTableModulo3UserProgress);
            workbook.Worksheets.Add(dataTableModulo4UserProgress);

            //make columns fit to content
            foreach (IXLWorksheet worksheet in workbook.Worksheets)
            {
                worksheet.Columns().AdjustToContents();
                worksheet.Rows().AdjustToContents();
            }

            using (MemoryStream stream = new MemoryStream())
            {
                workbook.SaveAs(stream);
                var file = File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename);
                //upload to google 
                try
                {
                    var GoogleDriveService = new GoogleDriveService();
                    var folderId = "17i0XpUI-3hCnfC73O29RXy6T495VfHeq";
                    GoogleDriveService.UploadFile(stream, filename, "", folderId, "Database backup");
                }
                catch (Exception e)
                {
                    _logger.LogError(e.Message);
                }

                return file;



            }
        }

    }

    private object?[] AddRowsToModuloTable(ModuloUserProgress moduloProgress, string code, int user_role, List<Exercicio> exercicios)
    {
        var subModules = moduloProgress.SubModuleUserProgresses;
        var content = new List<object?>
        {
            code,
            moduloProgress.DataInicio,
            moduloProgress.DataFim
        };
        _logger.LogInformation($"Adding user with subModules with count {subModules.Count} to excel file");
        foreach (SubModuleUserProgress subModuleUserProgress in subModules)
        {

            content.Add(subModuleUserProgress.DataInicio);
            content.Add(subModuleUserProgress.DataFim);



            if (moduloProgress.ModuloContent!.ModuleNumberOrder == 1
           && subModuleUserProgress.SubModule!.SubModuleNumberOrder == 1
           && user_role == 1)
            {

                content.Add(DateTime.MinValue);
                content.Add(DateTime.MinValue);
            }
        }

        string fav_exercises = "";
        for (int i = 0; i < exercicios.Count; i++)
        {
            fav_exercises = fav_exercises + exercicios[i].ExercicioName! + ", \n";
        }
        content.Add(fav_exercises);
        content.Add(moduloProgress.Recompensa);
        content.Add(moduloProgress.Utilidade);
        content.Add(moduloProgress.Satisfacao);


        return content.ToArray();
    }
}
