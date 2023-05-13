using AutoMapper;
using Faita.Chat.Models;
using Faita.Identity.Context;
using Faita.Identity.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Faita.Chat.Service;

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

        var message = _mapper.Map<Message>(sendMessageModel);
        message.Id = Guid.NewGuid().ToString();
        message.SenderId = sender.Id;
        message.Sender = sender;
        message.ReceiverId = receiver.Id;
        message.Receiver = receiver;
        message.CreatedAt = DateTime.Now;

        _dataContext.Message.Add(message);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<ChatRoom> CreateChatRoom(CreateChatRoomModel createChatRoomModel, string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        var friend = await _userManager.FindByIdAsync(createChatRoomModel.FriendId);

        var chatRoom = _mapper.Map<ChatRoom>(createChatRoomModel);
        chatRoom.Id = Guid.NewGuid().ToString();
        chatRoom.Users = new List<User> { user, friend }; // явно присваиваем значение

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

        _mapper.Map(joinChatRoomModel, chatRoom);

        await _dataContext.SaveChangesAsync();

        return chatRoom;
    }


    public async Task<List<GetChatRoomsModel>> GetChatRooms(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        var chatRooms = await _dataContext.ChatRoom
            .Include(c => c.Users)
            .Include(c => c.Messages)
            .Where(c => c.Users.Contains(user))
            .ToListAsync();

        var response = _mapper.Map<List<ChatRoom>, List<GetChatRoomsModel>>(chatRooms);

        return response;
    }
}