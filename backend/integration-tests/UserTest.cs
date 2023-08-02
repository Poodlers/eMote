using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

using backend.Models;

using Newtonsoft.Json;

using Xunit;
using Xunit.Extensions.Ordering;

namespace integration_tests;

public class AsnFactory : TestingWebAppFactory
{
    protected override void SeedDbForTests(DatabaseContext db)
    {
        User user1 = new User();
        user1.Code = "aaa";
        user1.Password = "123456";
        user1.Role = 1;

        User user2 = new User();
        user2.Code = "joan";
        user2.Password = "12345";
        user2.Role = 2;

        db.Users!.AddRange(new List<User>
            {
                user1,
                user2
            });
        db.SaveChanges();
    }
}

[Order(1)]
public class AsnIT : IClassFixture<AsnFactory>
{
    private readonly HttpClient _client;

    public AsnIT(AsnFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact, Order(0)]
    public async Task GetUsers()
    {
        var response = await _client.GetAsync("/user");
        response.EnsureSuccessStatusCode();

        var responseString = await response.Content.ReadAsStringAsync();

        var userList = JsonConvert.DeserializeObject<Dictionary<string, IEnumerable<User>>>(responseString);
        Assert.Equal(2, userList["users"].Count());
    }

}
