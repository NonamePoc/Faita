using System;
using System.Threading.Tasks;
using AutoMapper;
using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Context;
using Back_End_Service.Identity.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Back_End_Service.Chat.Service;

public class MessageService : IMessage
{
    private readonly UserManager<User> _userManager;
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public MessageService(UserManager<User> userManager, DataContext dataContext, IMapper mapper)
    {
        _userManager = userManager;
        _dataContext = dataContext;
        _mapper = mapper;
    }

    public async Task SendMessage(SendMessageModel sendMessageModel)
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

    public async Task CreateChatRoom(CreateChatRoomModel createChatRoomModel)
    {
        var user = await _userManager.FindByIdAsync(createChatRoomModel.UserId);
        
        var chatRoom = new ChatRoom
        {
            Id = Guid.NewGuid().ToString(),
            Name = createChatRoomModel.Name,
            Users = new List<User> {user}
        };
        
        _dataContext.ChatRoom.Add(chatRoom);
        await _dataContext.SaveChangesAsync();
    }

    public async Task JoinChatRoom(JoinChatRoomModel joinChatRoomModel)
    {
        // Получаем комнату чата по идентификатору
        var room = await _dataContext.ChatRoom.FindAsync(joinChatRoomModel.ChatRoomId);

        if (room == null)
        {
            throw new Exception("Chat room not found");
        }

        // Получаем пользователя по идентификатору
        var user = await _dataContext.Users.FindAsync(joinChatRoomModel.UserId);

        if (user == null)
        {
            throw new Exception("User room not found");
        }

        // Добавляем пользователя в комнату чата и сохраняем изменения в базе данных
        room.Users.Add(user);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<List<ChatRoom>> GetChatRoom(string UserId)
    {
        var user = await _userManager.FindByIdAsync(UserId);
        
        var chatRoom = await _dataContext.ChatRoom
            .Where(c => c.Users.Contains(user))
            .ToListAsync();
        
        return chatRoom.ToList();
    }
}