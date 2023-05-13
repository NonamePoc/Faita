using Faita.Chat;
using Faita.Chat.Models;
using Faita.Chat.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Faita.Controllers;

[Authorize]
[ApiController]
[Route(Route)]
public class MessageController : BaseController
{
    private const string Route = "chat";

    private readonly IHubContext<ChatHub> _hubContext;
    private readonly IMessage _messageService;

    public MessageController(IHubContext<ChatHub> hubContext, IMessage messageService)
    {
        _hubContext = hubContext;
        _messageService = messageService;
    }


    [HttpPost("sendMessage")]
    public async Task<IActionResult> SendMessage([FromBody]SendMessageModel sendMessage)
    {
        var user = GetUserId();
        await _messageService.SendMessage(sendMessage, user);

        // Отправить сообщение всем подключенным клиентам через хаб
        await _hubContext.Clients.All.SendAsync("ReceiveMessage", user,
            sendMessage.Text, sendMessage.ChatRoomId);

        return Ok();
    }

    [HttpPost("chatRoom")]
    public async Task<IActionResult> CreateChatRoom([FromBody]CreateChatRoomModel createChatRoomModel)
    {
        var user = GetUserId();
        await _messageService.CreateChatRoom(createChatRoomModel, user);
        await _hubContext.Clients.All.SendAsync("CreateChatRoom", user);
        return Ok();
    }


    [AllowAnonymous]
    [HttpGet("chatRooms")]
    public async Task<IActionResult> GetChatRooms()
    {
        var user = GetUserId();
        var chatRooms = await _messageService.GetChatRooms(user);
        return Ok(chatRooms);
    }

    // JoinChatRoom - присоединиться к комнате чата
    [HttpPost("joinChatRoom")]
    public async Task<IActionResult> JoinChatRoom([FromBody]JoinChatRoomModel joinChatRoomModel)
    {
        await _messageService.JoinChatRoom(joinChatRoomModel);
        await _hubContext.Clients.All.SendAsync("JoinChatRoom", joinChatRoomModel.ChatRoomId, joinChatRoomModel.UserId);
        return Ok();
    }
}