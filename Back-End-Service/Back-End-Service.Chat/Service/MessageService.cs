using AutoMapper;
using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Context;
using Back_End_Service.Identity.Entities;
using Microsoft.AspNetCore.Identity;

namespace Back_End_Service.Chat.Service;

public class MessageService : IMessage
{
    
    private readonly UserManager<User> _userManager;
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public MessageService( UserManager<User> userManager, DataContext dataContext, IMapper mapper)
    {
        _userManager = userManager;
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public  async Task SendMessage(SendMessageModel sendMessageModel)
    {
        var sender = await _userManager.FindByIdAsync(sendMessageModel.UserId);
        var receiver = await _userManager.FindByIdAsync(sendMessageModel.ReceiverId);
        
        // Создать новое сообщение и заполнить его данные
        
        
        var message = new Message
        {
            // random id
            Id = Guid.NewGuid().ToString(),
            Text = sendMessageModel.Text,
            SenderId = sender.Id,
            Sender = sender,
            ReceiverId = receiver.Id,
            Receiver = receiver,
            CreatedAt = DateTime.Now
        };

        _mapper.Map(sendMessageModel, message);
        // Сохранить сообщение в базе данных
        _dataContext.Message.Add(message);
        await _dataContext.SaveChangesAsync();
    }
}