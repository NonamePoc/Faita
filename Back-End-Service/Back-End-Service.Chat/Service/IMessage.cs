using System.Threading.Tasks;
using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Entities;

namespace Back_End_Service.Chat.Service;

public interface IMessage
{
    Task SendMessage(SendMessageModel sendMessageModel, string userId);
    
    Task CreateChatRoom(CreateChatRoomModel createChatRoomModel, string userId);
    
    Task<ChatRoom> JoinChatRoom(JoinChatRoomModel joinChatRoomModel, string userId);
    
    Task<List<object>> GetChatRooms(string UserId);
    
}