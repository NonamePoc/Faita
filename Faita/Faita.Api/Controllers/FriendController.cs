using Faita.Chat.Models;
using Faita.Chat.Service;
using Faita.Identity.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Faita.Controllers;

[Authorize]
[ApiController]
[Route(Route)]
public class FriendController : BaseController
{
    private const string Route = "friends";

    private readonly IFriendService _friendService;

    public FriendController(IFriendService friendService)
    {
        _friendService = friendService;
    }

    [HttpPost("friend")]
    public async Task<ActionResult> AddFriend([FromBody]AddFriendsModel friendsModel)
    {
        var currentUser = GetUserId();
        var response = await _friendService.AddFriendAsync(friendsModel, currentUser);
        return Ok(response);
    }

    [HttpGet("friend")]
    public async Task<ActionResult<List<User>>> GetFriends()
    {
        var user = GetUserId();
        var friends = await _friendService.GetFriends(user);
        return friends;
    }

    [HttpDelete("friend")]
    public async Task<IActionResult> RemoveFriend([FromQuery] string friendId)
    {
        var userid = GetUserId();
        await _friendService.RemoveFriend(friendId, userid);
        return Ok();
    }

    [HttpPost("confirm")]
    public async Task<IActionResult> ConfirmFriendRequest(ConfirmFriendRequestAsyncModel confirmFriendRequestAsyncModel)
    {
        var user = GetUserId();
        await _friendService.ConfirmFriendRequestAsync(confirmFriendRequestAsyncModel, user);
        return Ok();
    }


    [HttpGet("receiveRequest")]
    public async Task<ActionResult<List<User>>> GetReceiveRequest()
    {
        var user = GetUserId();
        var friends = await _friendService.GetReceiveRequest(user);
        return friends.ToList();
    }

    [HttpPost("cancelUserFriendRequest")]
    public async Task<IActionResult> CancelFriendRequest(CancelFriendRequestModel cancelFriendRequestModel)
    {
        var user = GetUserId();
        await _friendService.CancelUserFriendRequest(cancelFriendRequestModel, user);
        return Ok();
    }

    [HttpGet("sendRequest")]
    public async Task<ActionResult<List<User>>> GetSendRequest()
    {
        var user = GetUserId();
        var friends = await _friendService.GetSendRequest(user);
        return friends.ToList();
    }

    [HttpPost("friendRequestAsync")]
    public async Task<IActionResult> CancelFriendRequestAsync(CancelFriendRequestModel cancelFriendRequestModel)
    {
        var user = GetUserId();
        await _friendService.CancelFriendRequest(cancelFriendRequestModel, user);
        return Ok();
    }
}