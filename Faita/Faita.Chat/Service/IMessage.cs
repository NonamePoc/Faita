using Faita.Chat.Models;
using Faita.Identity.Entities;

namespace Faita.Chat.Service;

public interface IMessage
{
    Task SendMessage(SendMessageModel sendMessageModel, string userId);
    
    Task<ChatRoom> CreateChatRoom(CreateChatRoomModel createChatRoomModel, string userId);
    
    Task<ChatRoom> JoinChatRoom(JoinChatRoomModel joinChatRoomModel);
    
    Task<List<GetChatRoomsModel>> GetChatRooms(string UserId);

}