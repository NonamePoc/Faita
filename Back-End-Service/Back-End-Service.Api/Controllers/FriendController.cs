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
    [HttpGet("getFriends")]
    public async Task<ActionResult<List<User>>> GetFriends()
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        var friends = await _friendService.GetFriends(user);
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

        var response = await _friendService.AddFriendAsync(friendsModel, currentUser);


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

        await _friendService.ConfirmFriendRequestAsync(confirmFriendRequestAsyncModel, user);


        return Ok();
    }

    [Authorize]
    [HttpPost("removeFriend")]
    public async Task<IActionResult> RemoveFriend(RemoveFriendModel removeFriendModel)
    {
        var userid = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        var user = await _userManager.FindByIdAsync(userid);

        if (user == null)
        {
            return NotFound("User not found");
        }

        await _friendService.RemoveFriend(removeFriendModel, user);

        return Ok();
    }

    [Authorize]
    [HttpGet("GetReceiveRequest")]
    public async Task<ActionResult<List<User>>> GetReceiveRequest()
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        var friends = await _friendService.GetReceiveRequest(user);
        return friends.ToList();
    }

    [Authorize]
    [HttpPost("cancelUserFriendRequest")]
    public async Task<IActionResult> CancelFriendRequest(CancelFriendRequestModel cancelFriendRequestModel)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (user == null)
        {
            return NotFound("User not found");
        }

        await _friendService.CancelUserFriendRequest(cancelFriendRequestModel, user);

        return Ok();
    }

    [Authorize]
    [HttpGet("GetSendRequest")]
    public async Task<ActionResult<List<User>>> GetSendRequest()
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        var friends = await _friendService.GetSendRequest(user);
        return friends.ToList();
    }

    [Authorize]
    [HttpPost("cancelFriendRequestAsync")]
    public async Task<IActionResult> CancelFriendRequestAsync(CancelFriendRequestModel cancelFriendRequestModel)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (user == null)
        {
            return NotFound("User not found");
        }

        await _friendService.CancelFriendRequest(cancelFriendRequestModel, user);

        return Ok();
    }
}