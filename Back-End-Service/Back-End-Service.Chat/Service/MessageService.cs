using System;
using System.Threading.Tasks;
using AutoMapper;
using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Context;
using Back_End_Service.Identity.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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

    public async Task SendMessage(SendMessageModel sendMessageModel, string userId)
    {
        var sender = await _userManager.FindByIdAsync(userId);
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

    public async Task CreateChatRoom(CreateChatRoomModel createChatRoomModel, string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        var chatRoom = new ChatRoom
        {
            Id = Guid.NewGuid().ToString(),
            Name = createChatRoomModel.Name,
            Users = new List<User> { user }
        };

        _dataContext.ChatRoom.Add(chatRoom);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<ChatRoom> JoinChatRoom(JoinChatRoomModel joinChatRoomModel, string userId)
    {
        var chatRoom = await _dataContext.ChatRoom
            .Include(cr => cr.Users)
            .FirstOrDefaultAsync(cr => cr.Id == joinChatRoomModel.ChatRoomId);


        if (chatRoom == null)
        {
            throw new ArgumentException("Chat room not found.");
        }

        var user = await _dataContext.Users.FindAsync(userId);
        if (user == null)
        {
            throw new ArgumentException("User not found.");
        }

        chatRoom.Users.Add(user);
        await _dataContext.SaveChangesAsync();
        return chatRoom;
    }

    public async Task<List<object>> GetChatRooms(string UserId)
    {
        var user = await _userManager.FindByIdAsync(UserId);

        var chatRooms = await _dataContext.ChatRoom
            .Include(c => c.Users)
            .Include(c => c.Messages)
            .Where(c => c.Users.Contains(user))
            .ToListAsync();

        var result = chatRooms.Select(c => new
        {
            Id = c.Id,
            Name = c.Name,
            Users = c.Users.Select(u => new
            {
                Id = u.Id,
                UserName = u.UserName,
                
            }),
            Messages = c.Messages.Select(m => new
            {
                Id = m.Id,
                Text = m.Text,
                SenderId = m.SenderId,
                ChatRoomId = m.ChatRoomId,
                CreatedAt = m.CreatedAt 
            })
        }).ToList<object>();

        return result;
    }
}