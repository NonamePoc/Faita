using Back_End_Service.Chat;
using Back_End_Service.Chat.Models;
using Back_End_Service.Chat.Service;
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
        await _hubContext.Clients.All.SendAsync(sendMessage.ReceiverId, sendMessage.UserId, sendMessage.Text);

        return Ok();
    }
}