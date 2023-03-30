using Back_End_Service.Identity.Entities;

namespace Back_End_Service.Chat.Service;

public interface IMessageService
{
    Task<List<Message>> GetMessages(string userId, string friendId);
    Task AddMessage(string userId, string friendId, string text);
}