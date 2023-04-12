using Back_End_Service.Chat.Models;
using Back_End_Service.Chat.Service;
using Back_End_Service.Identity.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Back_End_Service.Controllers;

[ApiController]
[Route(Route)]
public class FriendController : ControllerBase
{
    private const string Route = "api/friends";

    private readonly UserManager<User> _userManager;
    private readonly IFriendService _friendService;

    public FriendController(UserManager<User> userManager, IFriendService friendService)
    {
        _userManager = userManager;
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
        var user = await _userManager.FindByIdAsync(friends.UserId);

        await _friendService.AddFriend(friends, user);

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