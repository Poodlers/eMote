using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/modulo-rating")]
public class RatingController : ControllerBase
{
    private readonly DbSet<User> _dbUserSet;
    private readonly DatabaseContext _context;


    public RatingController(DatabaseContext context)
    {
        this._context = context;
        this._dbUserSet = _context.Set<User>();
    }

    [HttpGet("{user_code}/{modulo_id}", Name = "GetModuloRating")]
    public ActionResult<RatingDTO> Get(String user_code, int modulo_id)
    {
        var modulo_rating = _dbUserSet.Include(user => user.ModulosProgress.Where(m =>
         m.ModuloContent!.ModuleNumberOrder == modulo_id))
         .Where(user => user.Code == user_code)
        .FirstOrDefault();

        if (modulo_rating == null)
        {
            return StatusCode(
                404,
                "Modulo Or User not found"

            );
        }

        var rating = new RatingDTO
        {
            Utilidade = modulo_rating.ModulosProgress[0].Utilidade,
            Satisfacao = modulo_rating.ModulosProgress[0].Satisfacao
        };

        return Ok(rating);
    }

    [HttpPost("{user_code}/{modulo_id}", Name = "SetModuloRating")]
    public async Task<ActionResult<RatingDTO>> Set(String user_code, int modulo_id, [FromBody] RatingDTO rating)
    {
        var modulo_rating = _dbUserSet.Include(user => user.ModulosProgress.Where(m =>
         m.ModuloContent!.ModuleNumberOrder == modulo_id))
         .Where(user => user.Code == user_code)
        .FirstOrDefault();

        if (modulo_rating == null)
        {
            return StatusCode(
                404,
                "Modulo Or User not found"

            );
        }

        modulo_rating.ModulosProgress[0].Utilidade = rating.Utilidade;
        modulo_rating.ModulosProgress[0].Satisfacao = rating.Satisfacao;

        await _context.SaveChangesAsync();

        return Ok(rating);
    }
    



}