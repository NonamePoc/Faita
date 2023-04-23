using Back_End_Service.Chat;
using Back_End_Service.Chat.Models;
using Back_End_Service.Chat.Service;
using Back_End_Service.Identity.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Back_End_Service.Controllers;

[ApiController]
[Route(Route)]
public class MessageController : Controller
{
    private const string Route = "api/chat";

    private readonly IHubContext<ChatHub> _hubContext;
    private readonly IMessage _messageService;
    private readonly DataContext _context;

    public MessageController(IHubContext<ChatHub> hubContext, IMessage messageService)
    {
        _hubContext = hubContext;
        _messageService = messageService;
    }


    [Authorize]
    [HttpPost("sendMessage")]
    public async Task<IActionResult> SendMessage(SendMessageModel sendMessage)
    {
        await _messageService.SendMessage(sendMessage);

        // Отправить сообщение всем подключенным клиентам через хаб
        await _hubContext.Clients.All.SendAsync("ReceiveMessage", sendMessage.UserId,
            sendMessage.Text, sendMessage.ChatRoomId, sendMessage.CreateMessage);

        return Ok();
    }

    [Authorize]
    [HttpPost("createChatRoom")]
    public async Task<IActionResult> CreateChatRoom(CreateChatRoomModel createChatRoomModel)
    {
        await _messageService.CreateChatRoom(createChatRoomModel);
        await _hubContext.Clients.All.SendAsync("CreateChatRoom", createChatRoomModel.UserId);
        return Ok();
    }


    [AllowAnonymous]
    [HttpGet("getChatRooms")]
    public async Task<IActionResult> GetChatRooms()
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        var chatRooms = await _messageService.GetChatRooms(user);
        return Ok(chatRooms);
    }

    [Authorize]
    // JoinChatRoom - присоединиться к комнате чата
    [HttpPost("joinChatRoom")]
    public async Task<IActionResult> JoinChatRoom(JoinChatRoomModel joinChatRoomModel)
    {
        await _messageService.JoinChatRoom(joinChatRoomModel);
        await _hubContext.Clients.All.SendAsync("JoinChatRoom", joinChatRoomModel.ChatRoomId, joinChatRoomModel.UserId);
        return Ok();
    }
}