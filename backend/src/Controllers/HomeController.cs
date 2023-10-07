namespace backend.Controllers;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("/")]
public class HomeController : ControllerBase
{

    [HttpGet(Name = "MockHome")]
    public Dictionary<string, string> Get()
    {
        var arr = new Dictionary<string, string>
        {
            { "greeting", "Hello World" }
        };
        return arr;
    }


}
