namespace backend.Controllers;

using backend.Models;


using WebPush;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

[ApiController]
[Route("/web-push")]
public class WebPushController : Controller
{

    private readonly IConfiguration _configuration;
    private readonly DbSet<Devices> _dbDevicesSet;

    private readonly DatabaseContext _context;


    public WebPushController(IConfiguration configuration, DatabaseContext context)
    {
        this._configuration = configuration;
        _context = context;
        _dbDevicesSet = context.Set<Devices>();

    }
    [HttpGet(Name = "SendNotification")]
    public ActionResult Send(int? id)
    {
        return Ok();
    }

    [HttpPost, ActionName("Send")]

    public async Task<ActionResult> Send(int id)
    {
        var payload = Request.Form["payload"];
        var device = await _context.Devices!.SingleOrDefaultAsync(m => m.Id == id);

        string vapidPublicKey = _configuration.GetSection("VapidKeys")["PublicKey"]!;
        string vapidPrivateKey = _configuration.GetSection("VapidKeys")["PrivateKey"]!;

        var pushSubscription = new PushSubscription(device!.PushEndpoint, device.PushP256DH, device.PushAuth);
        var vapidDetails = new VapidDetails("mailto:example@example.com", vapidPublicKey, vapidPrivateKey);

        var webPushClient = new WebPushClient();
        webPushClient.SendNotification(pushSubscription, payload, vapidDetails);

        return Ok();
    }

    [HttpGet("generate-keys", Name = "GenerateKeys")]
    public ActionResult GenerateKeys()
    {
        var keys = VapidHelper.GenerateVapidKeys();
        ViewBag.PublicKey = keys.PublicKey;
        ViewBag.PrivateKey = keys.PrivateKey;
        return Ok();
    }
}

