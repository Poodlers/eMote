using System.Globalization;

using backend.Models;

using Org.BouncyCastle.Asn1.Cms;


class NotificationPeriodicService : BackgroundService
{
    private readonly ILogger<NotificationPeriodicService> _logger;
    private readonly IServiceScopeFactory _factory;

    private int _executionCount = 0;


    private readonly Dictionary<TimeOnly, Refeicao> refeicaoTimes =
        new Dictionary<TimeOnly, Refeicao>(){

            {new TimeOnly(8,30,0), Refeicao.PequenoAlmoco},
            {new TimeOnly(10,30,0), Refeicao.LancheDaManha},
            {new TimeOnly(12,30,0), Refeicao.Almoco},
            {new TimeOnly(15,50,0), Refeicao.LancheDaTarde},
            {new TimeOnly(20,0,0), Refeicao.Jantar},
            {new TimeOnly(22,30,0), Refeicao.Ceia}
        };

    public bool IsEnabled { get; set; } = true;

    public NotificationPeriodicService(
        ILogger<NotificationPeriodicService> logger, IServiceScopeFactory factory)
    {
        _logger = logger;
        _factory = factory;

    }

    private Tuple<TimeSpan, Refeicao> GetScheduledParsedTime()
    {
        string[] formats = { @"hh\:mm\:ss", "hh\\:mm" };
        TimeOnly[] jobStartTimes = refeicaoTimes.Keys.ToArray();
        // gett the timeSpan between now and the next job start time

        var closestTime = jobStartTimes.MinBy(t => Math.Abs((
            t -
             new TimeOnly(DateTime.Now.TimeOfDay.Hours, DateTime.Now.TimeOfDay.Minutes, DateTime.Now.TimeOfDay.Seconds)
            ).Ticks));

        var ScheduledTimespan = new TimeSpan(closestTime.Hour, closestTime.Minute, closestTime.Second);

        return new Tuple<TimeSpan, Refeicao>(ScheduledTimespan, refeicaoTimes[closestTime]);
    }

    private Tuple<TimeSpan, Refeicao> GetJobRunDelay()
    {
        Tuple<TimeSpan, Refeicao> scheduledParsedTime = GetScheduledParsedTime();

        TimeSpan curentTimeOftheDay = DateTime.Now.TimeOfDay;
        TimeSpan delayTime = scheduledParsedTime.Item1 >= curentTimeOftheDay
            ? scheduledParsedTime.Item1 - curentTimeOftheDay     // Initial Run, when ETA is within 24 hours
            : new TimeSpan(24, 0, 0) - curentTimeOftheDay + scheduledParsedTime.Item1;   // For every other subsequent runs

        return new Tuple<TimeSpan, Refeicao>(delayTime, scheduledParsedTime.Item2);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Refeicao nextMeal;
        Tuple<TimeSpan, Refeicao> jobDelay = GetJobRunDelay();
        nextMeal = jobDelay.Item2;
        _logger.LogInformation(
                        $"Next meal -: {jobDelay.Item1}, {nextMeal}");
        PeriodicTimer timer = new PeriodicTimer(jobDelay.Item1);
        while (
            !stoppingToken.IsCancellationRequested &&
            await timer.WaitForNextTickAsync(stoppingToken))
        {
            try
            {
                if (IsEnabled)
                {
                    await using AsyncServiceScope asyncScope = _factory.CreateAsyncScope();
                    UserNotificationService sampleService = asyncScope.ServiceProvider.GetRequiredService<UserNotificationService>();
                    sampleService.SendOutNotifications(nextMeal);
                    jobDelay = GetJobRunDelay();
                    nextMeal = jobDelay.Item2;
                    timer = new PeriodicTimer(jobDelay.Item1);
                    _logger.LogInformation(
                        $"Next meal in -: {jobDelay.Item1}, {nextMeal}");
                    _executionCount++;
                    _logger.LogInformation(
                        $"Executed PeriodicHostedService - Count: {_executionCount}");
                }
                else
                {
                    _logger.LogInformation(
                        "Skipped PeriodicHostedService");
                }
            }
            catch (Exception ex)
            {
                _logger.LogInformation(
                    $"Failed to execute PeriodicHostedService with exception message {ex.Message}. Good luck next round!");
            }
        }
    }
}

record NotificationPeriodicServiceState(bool IsEnabled);