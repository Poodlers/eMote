class PeriodicHostedService : BackgroundService
{
    private readonly ILogger<PeriodicHostedService> _logger;
    private readonly IServiceScopeFactory _factory;
    
    private int _executionCount = 0;
    public bool IsEnabled { get; set; } = true;

    private readonly TimeSpan _period = TimeSpan.FromSeconds(60);
    public PeriodicHostedService(
        ILogger<PeriodicHostedService> logger,  IServiceScopeFactory factory)
    {
        _logger = logger;
        _factory = factory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using PeriodicTimer timer = new PeriodicTimer(_period);
        while (
            !stoppingToken.IsCancellationRequested &&
            await timer.WaitForNextTickAsync(stoppingToken))
        {    
        try
        {
            if (IsEnabled)
            {
                await using AsyncServiceScope asyncScope = _factory.CreateAsyncScope();
                UserAccessService sampleService = asyncScope.ServiceProvider.GetRequiredService<UserAccessService>();
                await sampleService.CheckIfUserAccessToApp();
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

record PeriodicHostedServiceState(bool IsEnabled);