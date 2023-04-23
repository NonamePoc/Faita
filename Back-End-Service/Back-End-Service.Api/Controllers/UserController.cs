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
    public async Task<IActionResult> ChangePassword(ChangePasswordModel changePasswordModel)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        await _userService.ChangePasswordAsync(changePasswordModel,
            Url.Action(nameof(ChangePassword), "Users", null, HttpContext.Request.Scheme) ?? string.Empty,
            await _userManager.FindByIdAsync(user));
        return Ok();
    }

    [AllowAnonymous]
    [HttpGet("change-email")]
    public async Task<IActionResult> ChangeEmail([FromQuery] ChangeEmailModel modelEmailModel)
    {
        await _userService.ChangeEmailAsync(modelEmailModel);

        return Ok();
    }

    [Authorize]
    [HttpPut("change-email")]
    public async Task<IActionResult> SendRequestChangeEmail(SendChangeEmailModel changeEmailModel)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;


        await _userService.SendRequestChangeEmailAsync(changeEmailModel,
            Url.Action(nameof(ChangeEmail), "Users", null, HttpContext.Request.Scheme) ?? string.Empty,
            await _userManager.FindByIdAsync(user));

        return Ok();
    }


    [Authorize]
    [HttpPut("change-user-data")]
    public async Task<IActionResult> ChangeUserData(ChangeUserDataModel changeUserDataModel)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        await _userService.ChangeUserDataAsync(changeUserDataModel, await _userManager.FindByIdAsync(user));
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
    public async Task<IActionResult> SearchUser(SearchUserModel searchUserModel)
    {
        var users = await _userManager.Users
            .Where(u => u.FirstName.Contains(searchUserModel.UserName))
            .ToListAsync();

        return Ok(users);
    }

    [Authorize]
    [HttpPost("add-avatar")]
    public async Task<IActionResult> AddAvatar(AddAvatarModel addAvatar)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        await _userService.AddAvatarAsync(addAvatar, await _userManager.FindByIdAsync(user));
        return Ok();
    }
}