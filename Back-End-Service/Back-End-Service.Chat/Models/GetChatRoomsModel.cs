namespace Back_End_Service.Chat.Models;

public class GetChatRoomsModel
{
    public string ChatId { get; set; }
    public string ChatName { get; set; }
    public List<GetChatRoomUserModel> Users { get; set; }
    public List<GetChatRoomMessageModel> Messages { get; set; }
}