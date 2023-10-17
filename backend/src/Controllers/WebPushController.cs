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

    [HttpGet, ActionName("SendNotifEveryone")]

    public async Task<ActionResult> SendToEveryone(int id)
    {
        var payload = "Example notification payload.";
        var devices = await _context.Devices!.ToListAsync();


        string vapidPublicKey = _configuration.GetSection("VapidKeys")["PublicKey"]!;
        var webPushClient = new WebPushClient();
        string vapidPrivateKey = _configuration.GetSection("VapidKeys")["PrivateKey"]!;
        var vapidDetails = new VapidDetails("mailto:example@example.com", vapidPublicKey, vapidPrivateKey);

        foreach (var device in devices)
        {
            var pushSubscription = new PushSubscription(device!.PushEndpoint, device.PushP256DH, device.PushAuth);
            try
            {
                webPushClient.SendNotification(pushSubscription, payload, vapidDetails);
            }
            catch
            {

                Console.WriteLine("expired:" + device.Name + "with ID: " + device.Id);
                _context.Devices!.Remove(device);
            }

        }
        await _context.SaveChangesAsync();

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

