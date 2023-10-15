using backend.Models;

using Microsoft.EntityFrameworkCore;

class UserAccessService
{
    private readonly ILogger<UserAccessService> _logger;

    private readonly DatabaseContext _dbContext;
    private readonly DbSet<User> _dbUserSet;

    public UserAccessService(ILogger<UserAccessService> logger, DatabaseContext context)
    {
        _logger = logger;
        this._dbContext = context;
        this._dbUserSet = _dbContext.Set<User>();
    }

    public async Task CheckIfUserAccessToApp()
    {
        _logger.LogInformation(
            "Running UserAccessService");

        foreach (var user in _dbUserSet)
        {
            if (user.HasAccessToApp && user.Role != 3)
            {
                //if it has been more than 2 months since the user was created, remove access
                if (DateTime.Now.Subtract((DateTime)user.CreatedAt!).Days / (365.25 / 12) > 2)
                {
                    user.HasAccessToApp = false;
                    _dbUserSet.Update(user);
                    await _dbContext.SaveChangesAsync();
                }
            }
        }
    }
}