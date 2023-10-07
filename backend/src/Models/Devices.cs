using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

using Microsoft.EntityFrameworkCore;

namespace backend.Models;
public class Devices
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? PushEndpoint { get; set; }
    public string? PushP256DH { get; set; }
    public string? PushAuth { get; set; }
}