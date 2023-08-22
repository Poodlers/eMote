using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class UserDTO
{
    [Required]
    public String? Code { get; set; }

    [Required]
    public String? Password { get; set; }

    [Required]
    public int Role { get; set; }
}

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public String? Code { get; set; }

    [Required]
    public String? Password { get; set; }

    [Required]
    public int Role { get; set; }

    [Required]
    public List<Access>? Accesses { get; set; }

    [Required]
    public List<EmotionDiaryEntry> EmotionDiaryEntries { get; set; } = new List<EmotionDiaryEntry>();

    [Required]
    public List<MealDiaryEntry> FoodDiaryEntries { get; set; } = new List<MealDiaryEntry>();

    [Required]
    public List<Modulo> Modulos { get; set; } = new List<Modulo>();

}

public class Access {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public String? DataInicio;

    [Required]
    public String? DataFim;
}

