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

    public async Task<ChatRoom> CreateChatRoom(CreateChatRoomModel createChatRoomModel, string userId)
    {
        var  user = await _userManager.FindByIdAsync(userId);
        var friend = await _userManager.FindByIdAsync(createChatRoomModel.FriendId);

        var chatRoom = new ChatRoom
        {
            Id = Guid.NewGuid().ToString(),
            Name = createChatRoomModel.Name,
            Users = new List<User> { user, friend }
        };

        _dataContext.ChatRoom.Add(chatRoom);
        await _dataContext.SaveChangesAsync();

        return chatRoom;
    }

    public async Task<ChatRoom> JoinChatRoom(JoinChatRoomModel joinChatRoomModel)
    {
        var chatRoom = await _dataContext.ChatRoom
            .Include(cr => cr.Users)
            .FirstOrDefaultAsync(cr => cr.Id == joinChatRoomModel.ChatRoomId);

        if (chatRoom == null)
        {
            throw new ArgumentException("Chat room not found.");
        }

        var user = await _dataContext.Users.FindAsync(joinChatRoomModel.UserId);
        if (user == null)
        {
            throw new ArgumentException("User not found.");
        }

        chatRoom.Users.Add(user);
        await _dataContext.SaveChangesAsync();
        return chatRoom;
    }

    public async Task<List<GetChatRoomsModel>> GetChatRooms(string UserId)
    {
        var user = await _userManager.FindByIdAsync(UserId);

        var chatRooms = await _dataContext.ChatRoom
            .Include(c => c.Users)
            .Include(c => c.Messages)
            .Where(c => c.Users.Contains(user))
            .ToListAsync();

        var response = chatRooms.Select(c => new GetChatRoomsModel
        {
            ChatId = c.Id,
            ChatName = c.Name,
            Users = c.Users.Select(u => new GetChatRoomUserModel
            {
                UserId = u.Id,
                UserName = u.UserName,
                Avatar = u.Avatar
            }).ToList(),
            Messages = c.Messages.Select(m => new GetChatRoomMessageModel
            {
                MessageId = m.Id,
                Text = m.Text,
                SenderId = m.SenderId,
                CreatedAt = m.CreatedAt
            }).ToList()
        }).ToList();

        return response;
    }
}