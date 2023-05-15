using Microsoft.AspNetCore.Mvc;

namespace Faita.Controllers;

public class BaseController : ControllerBase
{
    [HttpGet]
    public string GetUserId()
    {
        return User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
    }
}