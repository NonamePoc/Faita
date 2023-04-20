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
    public async Task<ActionResult<List<User>>> GetFriends(GetFriendsModel getFriendsModel)
    {
        var friends = await _friendService.GetFriends(getFriendsModel);
        return friends.ToList();
    }

    [Authorize]
    [HttpPost("addFriend")]
    public async Task<ActionResult> AddFriend(AddFriendsModel friendsModel)
    {
        var currentUser = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (currentUser == null)
        {
            return BadRequest(new { message = "Invalid user." });
        }

        var response = await _friendService.AddFriendAsync(friendsModel);


        return Ok(response);
    }


    [Authorize]
    [HttpPost("confirmFriendRequest")]
    public async Task<IActionResult> ConfirmFriendRequest(ConfirmFriendRequestAsyncModel confirmFriendRequestAsyncModel)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (user == null)
        {
            return NotFound("User not found");
        }

        await _friendService.ConfirmFriendRequestAsync(confirmFriendRequestAsyncModel);


        return Ok();
    }

    [Authorize]
    [HttpPost("removeFriend")]
    public async Task<IActionResult> RemoveFriend(RemoveFriendModel removeFriendModel)
    {
        var user = await _userManager.FindByIdAsync(removeFriendModel.UserId);

        if (user == null)
        {
            return NotFound("User not found");
        }

        await _friendService.RemoveFriend(removeFriendModel, user);

        return Ok();
    }
}