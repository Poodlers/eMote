using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public enum Sentimento
{
    Ansiosa,
    Aborrecida,
    Culpada,
    Entusiasmada,
    Envergonhada,
    Feliz,
    Frustrada,
    Furiosa,
    Irritada,
    Motivada,
    Orgulhosa,
    Sozinha,
    Tranquila,
    Triste
}
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Refeicao
{
   PequenoAlmoco,
   LancheDaManha,
   Almoco,
   LancheDaTarde,
   Jantar,
   Ceia,
   Outra
}

public enum CompensatoryBehavior
{
   Vomitar,
   AtividadeFisicaExcessiva,
   RestricaoAlimentarExcessiva,
   TomarLaxantes,
   TomarMedicacaoParaEmagrecer,
   Outro
}

public class EmotionDiaryEntryDTO{
    [Required]
    public String? UserCode { get; set; }

    [Required]
    public String? Date { get; set; }

    [Required]
    public String? Hour { get; set; }

    [Required]
    public ICollection<Sentimento> Sentimentos { get; set; } = new List<Sentimento>();

    [Required]
    public List<Exercicio> Exercicios { get; set; } = new List<Exercicio>();

    public String? Reflexao;
}


public class EmotionDiaryEntry {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public DateOnly? Date { get; set; }

    [Required]
    public TimeOnly? Hour { get; set; }

    [Required]
    public ICollection<Sentimento> Sentimentos { get; set; } = new List<Sentimento>();

    [Required]
    public List<Exercicio> Exercicios { get; set; } = new List<Exercicio>();

    public String? Reflexao;
}


public class MealDiaryEntryDTO{
    [Required]
    public String? UserCode { get; set; }

    [Required]
    public String? Date { get; set; }

    [Required]
    public String? Hour { get; set; }

    [Required]
    public Refeicao? TipoRefeicao { get; set; }

    public bool SkippedMeal {get; set;} //yes or no question - perg1

    public String? TimeOfMeal { get; set; } // perg2

    public ICollection<Sentimento> FeelingsAroundMeal { get; set; } = new List<Sentimento>(); //perg3

    public String? ContentsOfMeal { get; set; } //perg4

    public bool? PlainAttention { get; set; } //perg5

    public bool? RestrainedConsumption { get; set; } //perg6

    public bool? HadAnEpisode { get; set; } //perg7

    public bool? HadCompensatoryBehaviour { get; set; } //perg8

    public ICollection<CompensatoryBehavior> CompensatoryBehaviors { get; set; } = new List<CompensatoryBehavior>(); //perg8_options

    public String? Reflexao { get; set; } //perg_9
}
public class MealDiaryEntry{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]
    public DateOnly? Date { get; set; }
    [Required]
    public TimeOnly? Hour { get; set; }
    [Required]
    public Refeicao? TipoRefeicao { get; set; }

    public bool SkippedMeal {get; set;} //yes or no question - perg1

    public String? TimeOfMeal { get; set; } // perg2

    public ICollection<Sentimento> FeelingsAroundMeal { get; set; } = new List<Sentimento>(); //perg3

    public String? ContentsOfMeal { get; set; } //perg4

    public bool? PlainAttention { get; set; } //perg5

    public bool? RestrainedConsumption { get; set; } //perg6

    public bool? HadAnEpisode { get; set; } //perg7

    public bool? HadCompensatoryBehaviour { get; set; } //perg8

    public ICollection<CompensatoryBehavior> CompensatoryBehaviors { get; set; } = new List<CompensatoryBehavior>(); //perg8_options

    public String? Reflexao { get; set; } //perg_9

}

public class ExercicioDTO{
    [Required]
    public String? ExercicioName { get; set; }

    [Required]
    public String? ExercicioFile { get; set; }
}

public class Exercicio{

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int ModuloNumberOrder { get; set; }

    [Required]
    public String? ExercicioName { get; set; }

    [Required]
    public String? ExercicioFile { get; set; }


}

public class SubModulePage{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public String? Text { get; set; }
    public String? VideoFile { get; set; }
    public String? ImageFile { get; set; }
    public String? OtherFile { get; set; }

    [ForeignKey("SubModuleExercicios")]
    public List<Exercicio> Exercicios { get; set; } = new List<Exercicio>();
}

public class SubModule{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int SubModuleNumberOrder { get; set; }

    public String? Title { get; set; }


    public List<SubModulePage> SubModulePages { get; set; } = new List<SubModulePage>();


}

public class SubModuleUserProgress{
    
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public SubModule? SubModule { get; set; }

    public DateTime? DataInicio { get; set; }

    public DateTime? DataFim { get; set; }

}

public class ProgressDTO{
    public String? TimeStampInicio { get; set; }

    public String? TimeStampFim { get; set; }
}

public class RatingDTO{
    public int? Utilidade { get; set; }

    public int? Satisfacao { get; set; }
}

public class ModuloContent {

    [Key]
    public int ModuleNumberOrder { get; set; }

    [Required]
    public String? Title { get; set; }

  
    [ForeignKey("SubModuleContent")]
    public List<SubModule> SubModules { get; set; } = new List<SubModule>();

}


public class ModuloUserProgress{

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public ModuloContent? ModuloContent { get; set; }

    [Required]
    public List<SubModuleUserProgress> SubModuleUserProgresses { get; set; } = new List<SubModuleUserProgress>();

    [Required]
    public float UserProgress { get; set; } = 0;

    public DateTime? DataInicio { get; set; }

    public DateTime? DataFim { get; set; }

    public String? Recompensa { get; set; }

    public int? Utilidade { get; set; }

    public int? Satisfacao { get; set; }

    public ModuloUserProgress(){

    }
    //create a constructor for this class
    public ModuloUserProgress(ModuloContent modulo){
        this.ModuloContent = modulo;
        this.DataInicio = null;
        this.DataFim = null;
        this.Recompensa = "";
        this.Utilidade = 0;
        this.Satisfacao = 0;

        foreach (SubModule subModule in modulo.SubModules)
        {
            this.SubModuleUserProgresses.Add(new SubModuleUserProgress{
                SubModule = subModule,
                DataInicio = null,
                DataFim = null
            });
        }
        
    }

}