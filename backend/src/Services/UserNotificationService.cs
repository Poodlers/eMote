using backend.Models;

using Microsoft.EntityFrameworkCore;

using WebPush;
class UserNotificationService
{
    private readonly ILogger<UserNotificationService> _logger;

    private readonly IConfiguration _configuration;

    private readonly DatabaseContext _dbContext;

    private readonly Dictionary<int, List<Refeicao>> mealsToBeNotified =
        new Dictionary<int, List<Refeicao>>(){
            {6, new List<Refeicao>(){Refeicao.PequenoAlmoco, Refeicao.LancheDaManha, Refeicao.Almoco, Refeicao.LancheDaTarde, Refeicao.Jantar, Refeicao.Ceia}},
            {5, new List<Refeicao>(){Refeicao.PequenoAlmoco, Refeicao.LancheDaManha, Refeicao.Almoco, Refeicao.LancheDaTarde, Refeicao.Jantar}},
            {4, new List<Refeicao>(){Refeicao.PequenoAlmoco, Refeicao.LancheDaTarde, Refeicao.Almoco, Refeicao.Jantar}},
            {3, new List<Refeicao>(){Refeicao.PequenoAlmoco, Refeicao.Almoco, Refeicao.Jantar}},
            {2, new List<Refeicao>(){Refeicao.Jantar, Refeicao.Almoco}},
            {1, new List<Refeicao>(){Refeicao.Almoco}},
            {0, new List<Refeicao>()}
        };

    private readonly DbSet<User> _dbUserSet;

    private readonly DbSet<Devices> _devicesDbSet;

    public UserNotificationService(ILogger<UserNotificationService> logger, IConfiguration configuration, DatabaseContext context)
    {
        _logger = logger;
        this._dbContext = context;
        this._dbUserSet = _dbContext.Set<User>();
        this._devicesDbSet = _dbContext.Set<Devices>();
        this._configuration = configuration;
    }

    public void SendOutNotifications(Refeicao nextMeal)
    {
        _logger.LogInformation(
            "Running UserNotificationService");

        foreach (var device in _devicesDbSet)
        {
            var user = _dbUserSet.Where(u => u.Code == device.Name).FirstOrDefault();
            if (user == null)
            {
                _logger.LogError("User not found");
                continue;
            }

            var mealsToBeNotifiedForUser = mealsToBeNotified[user.NotifsPerDay];
            if (!mealsToBeNotifiedForUser.Contains(nextMeal))
            {
                _logger.LogInformation("User not scheduled to be notified at this time");
                continue;
            }
            var payload = "Já usou a eMote hoje?";


            string vapidPublicKey = _configuration.GetSection("VapidKeys")["PublicKey"]!;
            string vapidPrivateKey = _configuration.GetSection("VapidKeys")["PrivateKey"]!;

            var pushSubscription = new PushSubscription(device!.PushEndpoint, device.PushP256DH, device.PushAuth);
            var vapidDetails = new VapidDetails("mailto:example@example.com", vapidPublicKey, vapidPrivateKey);

            var webPushClient = new WebPushClient();
            webPushClient.SendNotification(pushSubscription, payload, vapidDetails);
        }
    }
}