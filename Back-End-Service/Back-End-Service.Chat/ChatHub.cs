using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Back_End_Service.Chat;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
    
    
}