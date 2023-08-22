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


public class EmotionDiaryEntry {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public String? Date { get; set; }

    [Required]
    public String? Hour { get; set; }

    [Required]
    public ICollection<Sentimento> Sentimentos { get; set; }

    [Required]
    [ForeignKey("SubModule")]
    public List<SubModule> Exercicios { get; set; } = new List<SubModule>();

    public String? Reflexao;
}

public class MealDiaryEntry{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]
    public String? Date { get; set; }
    [Required]
    public String? Hour { get; set; }
    [Required]
    public Refeicao? TipoRefeicao { get; set; }

    public bool SkippedMeal {get; set;} //yes or no question - perg1

    public String? TimeOfMeal { get; set; } // perg2

    public ICollection<Sentimento> FeelingsAroundMeal { get; set; } //perg3

    public String? ContentsOfMeal { get; set; } //perg4

    public bool? PlainAttention { get; set; } //perg5

    public bool? RestrainedConsumption { get; set; } //perg6

    public bool? HadAnEpisode { get; set; } //perg7

    public bool? HadCompensatoryBehaviour { get; set; } //perg8

    public ICollection<CompensatoryBehavior> CompensatoryBehaviors { get; set; } //perg8_options

    public String? Reflexao { get; set; } //perg_9

}

public class SubModule{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int SubModuleNumberOrder { get; set; }

    public String? Title { get; set; }

    public String? DataInicio { get; set; }

    public String? DataFim { get; set; }

}

public class Modulo {

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int ModuleNumberOrder { get; set; }

    public String? DataInicio { get; set; }

    public String? DataFim { get; set; }

    [ForeignKey("SubModule")]
    public List<SubModule> SubModules { get; set; } = new List<SubModule>();

    [ForeignKey("SubModuleFavorites")]
    public List<SubModule> FavoriteSubModules { get; set; } = new List<SubModule>();

    public String? Recompensa { get; set; }

    public int? Utilidade { get; set; }

    public int? Satisfacao { get; set; }
}