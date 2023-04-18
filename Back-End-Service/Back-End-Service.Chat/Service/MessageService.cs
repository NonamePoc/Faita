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
            Users = new List<User> { user }
        };

        _dataContext.ChatRoom.Add(chatRoom);
        await _dataContext.SaveChangesAsync();
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

    public async Task<List<ChatRoom>> GetChatRooms(string UserId)
    {
        var user = await _userManager.FindByIdAsync(UserId);

        var chatRoom = await _dataContext.ChatRoom
            .Where(c => c.Users.Contains(user))
            .ToListAsync();

        return chatRoom.ToList();
    }

    public async Task<ChatRoom> GetChatRoom(GetChatRoomModels getChatRoomModels)
    {
        // Ищем комнату чата с указанным идентификатором в базе данных
        var chatRoom = await _dataContext.ChatRoom.FindAsync(getChatRoomModels.ChatRoomId);

        // Если комната чата найдена, возвращаем ее
        if (chatRoom != null)
        {
            return _mapper.Map<ChatRoom>(chatRoom);
        }
        else
        {
            // Иначе, выбрасываем исключение или возвращаем null, в зависимости от того, как вы хотите обрабатывать отсутствующие комнаты чата
            throw new Exception($"Chat room with id {getChatRoomModels} not found");
            // return null;
        }
    }

}