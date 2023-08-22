using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
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

[JsonConverter(typeof(JsonStringEnumConverter))]
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
    public String? Date;

    [Required]
    public String? Hour;

    [Required]
    public List<Sentimento> Sentimentos { get; set; } = new List<Sentimento>();

    [Required]
    public List<String> Exercicios { get; set; } = new List<String>();

    public String? Reflexao;
}

public class MealDiaryEntry{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public String? Date;

    public String? Hour;

    public Refeicao? TipoRefeicao;

    public bool SkippedMeal; //yes or no question - perg1

    public String? TimeOfMeal; // perg2

    public List<Sentimento> FeelingsAroundMeal { get; set; } = new List<Sentimento>(); //perg3

    public String? ContentsOfMeal; //perg4

    public bool? PlainAttention; //perg5

    public bool? RestrainedConsumption; //perg6

    public bool? HadAnEpisode; //perg7

    public bool? HadCompensatoryBehaviour ; //perg8

    public List<CompensatoryBehavior>? CompensatoryBehaviors; //perg8_options

    public String? Reflexao; //perg_9

}

public class SubModule{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int ModuleNumber { get; set; }

    public String? Title;

    public String? DataInicio;

    public String? DataFim;

}

public class Modulo {

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int ModuleNumber { get; set; }

    public String? DataInicio;

    public String? DataFim;

    public List<SubModule> SubModules { get; set; } = new List<SubModule>();

    public List<int>? FavoriteSubModules;

    public String? Recompensa;

    public int? Utilidade;

    public int? Satisfacao;
}