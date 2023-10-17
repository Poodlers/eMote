using backend.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using WebPush;

namespace backend.Controllers;

[ApiController]
[Route("/deploy")]
public class DeployController : ControllerBase
{
    private readonly ILogger<DeployController> _logger;

    private readonly IConfiguration _configuration;
    private readonly DbSet<Devices> _dbDevicesSet;
    private readonly DatabaseContext _context;
    public DeployController(ILogger<DeployController> logger, IConfiguration configuration, DatabaseContext context)
    {
        this._context = context;
        _logger = logger;
        this._configuration = configuration;
        this._dbDevicesSet = _context.Set<Devices>();
    }

    [HttpGet(Name = "ResetAllServiceWorkers")]
    public void Get()
    {
        string vapidPublicKey = _configuration.GetSection("VapidKeys")["PublicKey"]!;
        var payload = "deploy";
        string vapidPrivateKey = _configuration.GetSection("VapidKeys")["PrivateKey"]!;
        var vapidDetails = new VapidDetails("mailto:example@example.com", vapidPublicKey, vapidPrivateKey);

        var webPushClient = new WebPushClient();
        foreach (var device in _dbDevicesSet)
        {
            //send 'deploy' notification
            var pushSubscription = new PushSubscription(device!.PushEndpoint, device.PushP256DH, device.PushAuth);
            try
            {
                webPushClient.SendNotification(pushSubscription, payload, vapidDetails);
            }
            catch
            {
                Console.WriteLine("User push Subscription has expired:" + device.Name + "with ID: " + device.Id);

            }

        }
        _context.Devices!.RemoveRange(_context.Devices!);
        _context.SaveChanges();
    }




}