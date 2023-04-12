using System.Threading.Tasks;
using Back_End_Service.Chat.Models;
using Microsoft.AspNetCore.SignalR;

namespace Back_End_Service.Chat;

public class ChatHub : Hub
{
    
    
    public async Task SendMessage(SendMessageModel sendMessage)
    {
        await Clients.All.SendAsync("SendMessage", sendMessage.ReceiverId, sendMessage.UserId, sendMessage.Text);
    }
}