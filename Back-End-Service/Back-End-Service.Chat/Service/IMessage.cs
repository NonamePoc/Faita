using Back_End_Service.Chat.Models;

namespace Back_End_Service.Chat.Service;

public interface IMessage
{
    Task SendMessage(SendMessageModel sendMessageModel);
}