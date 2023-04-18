using Back_End_Service.Chat;
using Back_End_Service.Chat.Models;
using Back_End_Service.Chat.Service;
using Back_End_Service.Identity.Context;
using Back_End_Service.Identity.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Back_End_Service.Controllers;

[ApiController]
[Route(Route)]
public class FriendController : ControllerBase
{
    private const string Route = "api/friends";

    private readonly UserManager<User> _userManager;
    private readonly IFriendService _friendService;
    private readonly DataContext _context;

    public FriendController(UserManager<User> userManager, IFriendService friendService, DataContext context)
    {
        _userManager = userManager;
        _context = context;
        _friendService = friendService;
    }


    [AllowAnonymous]
    [HttpPost("getFriends")]
    public async Task<ActionResult<List<User>>> GetFriends(GetFriends getFriends)
    {
        var friends = await _friendService.GetFriends(getFriends);
        return friends.ToList();
    }

    [Authorize]
    [HttpPost("addFriend")]
    public async Task<ActionResult> AddFriend(AddFriends friends)
    {
        var currentUser = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (currentUser == null)
        {
            return BadRequest(new { message = "Invalid user." });
        }

        if (await _friendService.AddFriendAsync(friends))
        {
            return StatusCode(200); // успешное добавление нового друга
        }
        else
        {
            return BadRequest(new { message = "Friend already exists." });
        }
    }

    
    [Authorize]
    [HttpPost("confirmFriendRequest")]
    public async Task<IActionResult> ConfirmFriendRequest(ConfirmFriendRequestAsync confirmFriendRequestAsync)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (user == null)
        {
            return NotFound("User not found");
        }

        await _friendService.ConfirmFriendRequestAsync(confirmFriendRequestAsync);
        

        return Ok();
    }

    [Authorize]
    [HttpPost("removeFriend")]
    public async Task<IActionResult> RemoveFriend(RemoveFriend removeFriend)
    {
        var user = await _userManager.FindByIdAsync(removeFriend.UserId);

        if (user == null)
        {
            return NotFound("User not found");
        }

        await _friendService.RemoveFriend(removeFriend, user);

        return Ok();
    }
}