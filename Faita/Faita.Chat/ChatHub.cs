using Faita.Chat.Models;
using Microsoft.AspNetCore.SignalR;

namespace Faita.Chat;

public class ChatHub : Hub
{
    public async Task SendMessage(SendMessageModel sendMessage, string UserId)
    {
        await Clients.All.SendAsync(sendMessage.ReceiverId, UserId, sendMessage.Text);
    }
}