using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using backend.Models;
namespace backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using WebPush;

[ApiController]
[Route("/devices")]
public class DevicesController : Controller
{
    private readonly DatabaseContext _context;

    private readonly IConfiguration _configuration;

    public DevicesController(DatabaseContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // GET: Devices
    [HttpGet(Name = "GetDevicesList")]
    public async Task<ActionResult<List<Devices>>> Index()
    {
        return await _context.Devices!.ToListAsync();
    }

    // GET: Devices/Create
    [HttpGet("create", Name = "CreateDevice")]
    public ActionResult Create()
    {
        ViewBag.PublicKey = _configuration.GetSection("VapidKeys")["PublicKey"];

        return Ok();
    }

    // POST: Devices/Create
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
    // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost("create", Name = "CreateDevice")]
    public async Task<ActionResult<Devices>> Create([Bind("Name,PushEndpoint,PushP256DH,PushAuth")] Devices device)
    {
        if (ModelState.IsValid && !_context.Devices!.Any(d => d.PushEndpoint == device.PushEndpoint))
        {

            _context.Add(device);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        return device;
    }
    // get: Devices/Delete/5
    [HttpGet("delete/{id}", Name = "DeleteDevice")]
    public async Task<ActionResult<Devices>> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var devices = await _context.Devices!
            .SingleOrDefaultAsync(m => m.Id == id);
        if (devices == null)
        {
            return NotFound();
        }

        return devices;
    }

    // POST: Devices/Delete/5
    [HttpPost("delete/{id}"), ActionName("Delete")]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var devices = await _context.Devices!.SingleOrDefaultAsync(m => m.Id == id);
        _context.Devices!.Remove(devices!);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }
}
