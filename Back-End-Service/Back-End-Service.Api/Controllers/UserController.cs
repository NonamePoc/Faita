using Back_End_Service.Identity.Entities;
using Back_End_Service.Identity.Models;
using Back_End_Service.Identity.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_End_Service.Controllers;

[ApiController]
[Authorize]
[Route(Route)]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly UserManager<User> _userManager;
    private const string Route = "api/users";

    public UsersController(IUserService userService, UserManager<User> userManager)
    {
        _userManager = userManager;
        _userService = userService;
    }


    [AllowAnonymous]
    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate(AuthenticateRequest model)
    {
        var response = await _userService.Authenticate(model);


        return Ok(response);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        await _userService.Logout(user);
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserModel userModel)
    {
        await _userService.Register(userModel,
            Url.Action(nameof(ConfirmEmail), "Users", null, HttpContext.Request.Scheme) ?? string.Empty);

        return Ok();
    }


    [AllowAnonymous]
    [HttpGet("confirm-email")]
    public async Task<IActionResult> ConfirmEmail(string userId, string token)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        if (user.EmailConfirmed)
        {
            return BadRequest(new { message = "Email already confirmed." });
        }

        var validToken = token.Replace(" ", "+");
        var result = await _userManager.ConfirmEmailAsync(user, validToken);
        if (!result.Succeeded)
        {
            return BadRequest(new { message = "Failed to confirm email." });
        }

        return Ok();
    }

    [AllowAnonymous]
    [HttpPut("change-password")]
    public async Task<IActionResult> ChangePassword(ChangePassword changePassword)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        await _userService.ChangePasswordAsync(changePassword,
            Url.Action(nameof(ChangePassword), "Users", null, HttpContext.Request.Scheme) ?? string.Empty,
            await _userManager.FindByIdAsync(user));
        return Ok();
    }

    [AllowAnonymous]
    [HttpGet("change-email")]
    public async Task<IActionResult> ChangeEmail([FromQuery] ChangeEmail modelEmail)
    {
        await _userService.ChangeEmailAsync(modelEmail);

        return Ok();
    }

    [Authorize]
    [HttpPut("change-email")]
    public async Task<IActionResult> SendRequestChangeEmail(SendChangeEmail changeEmail)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;


        await _userService.SendRequestChangeEmailAsync(changeEmail,
            Url.Action(nameof(ChangeEmail), "Users", null, HttpContext.Request.Scheme) ?? string.Empty,
            await _userManager.FindByIdAsync(user));

        return Ok();
    }


    [Authorize]
    [HttpPut("change-user-data")]
    public async Task<IActionResult> ChangeUserData(ChangeUserData changeUserData)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        await _userService.ChangeUserDataAsync(changeUserData, await _userManager.FindByIdAsync(user));
        return Ok();
    }


    [Authorize]
    [HttpGet("get-user-id")]
    public async Task<IActionResult> GetUserId()
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        await _userService.GetUserId(user);
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("SearchUser")]
    public async Task<IActionResult> SearchUser(SearchUser searchUser)
    {
        var users = await _userManager.Users
            .Where(u => u.FirstName.Contains(searchUser.UserName))
            .ToListAsync();

        return Ok(users);
    }
}