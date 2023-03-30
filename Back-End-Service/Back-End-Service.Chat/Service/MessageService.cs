using Back_End_Service.Identity.Context;
using Back_End_Service.Identity.Entities;
using Microsoft.EntityFrameworkCore;

namespace Back_End_Service.Chat.Service;

public class MessageService : IMessageService
{

    private readonly DataContext _dataContext;
    
    public MessageService(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<List<Message>> GetMessages(string userId, string friendId)
    {
        var messages = await _dataContext.Message.Where(m =>
                m.SenderId == userId && m.ReceiverId == friendId || m.SenderId == friendId && m.ReceiverId == userId)
            .ToListAsync();
        return messages;
    }

    public async Task AddMessage(string senderId, string receiverId, string text)
    {
        var message = new Message
        {
            SenderId = senderId,
            ReceiverId = receiverId,
            Text = text
        };

        await _dataContext.Message.AddAsync(message);
        await _dataContext.SaveChangesAsync();
    }
}