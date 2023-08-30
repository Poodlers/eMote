using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class LoginDTO
{
    [Required]
    public String? Code { get; set; }

    [Required]
    public String? Password { get; set; }
}

public class UserDTO
{
    [Required]
    public String? Code { get; set; }

    [Required]
    public String? Password { get; set; }

    [Required]
    public String? CreatedAt { get; set; }

    [Required]
    public int Role { get; set; }
}

public class User
{

    [Key]
    [Required]
    public String? Code { get; set; }

    [Required]
    public String? Password { get; set; }

    [Required]
    public DateTime? CreatedAt { get; set; } = DateTime.Now;

    [Required]
    public int Role { get; set; }

    [Required]
    public bool HasAccessToApp { get; set; } = true;

    [Required]
    [ForeignKey("UserAccesses")]
    public List<Access>? Accesses { get; set; } = new List<Access>();

    [Required]
    [ForeignKey("UserEmotionDiaries")]
    public List<EmotionDiaryEntry> EmotionDiaryEntries { get; set; } = new List<EmotionDiaryEntry>();

    [Required]
    [ForeignKey("UserFoodDiaries")]
    public List<MealDiaryEntry> FoodDiaryEntries { get; set; } = new List<MealDiaryEntry>();

    [Required]
    [ForeignKey("UserModulos")]
    public List<ModuloUserProgress> ModulosProgress { get; set; } = new List<ModuloUserProgress>();

    [ForeignKey("ExerciseFav")]
    public List<Exercicio> FavoriteExercises { get; set; } = new List<Exercicio>();

}

public class Access
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public DateTime? DataInicio { get; set; }

    [Required]
    public DateTime? DataFim { get; set; }
}

public class AccessDTO
{
    [Required]
    public String? UserCode { get; set; }

    [Required]
    public String? DataInicio { get; set; }

    [Required]
    public String? DataFim { get; set; }
}