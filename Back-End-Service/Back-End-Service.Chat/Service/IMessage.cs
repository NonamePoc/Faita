using System.Threading.Tasks;
using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Entities;

namespace Back_End_Service.Chat.Service;

public interface IMessage
{
    Task SendMessage(SendMessageModel sendMessageModel);
    
    Task CreateChatRoom(CreateChatRoomModel createChatRoomModel);
    
    Task<ChatRoom> JoinChatRoom(JoinChatRoomModel joinChatRoomModel);
    
    Task<List<object>> GetChatRooms(string UserId);
    
}