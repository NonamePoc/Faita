namespace Faita.Chat.Models;

public class GetChatRoomMessageModel
{
    public string MessageId { get; set; }
    public string Text { get; set; }
    public string SenderId { get; set; }
    public DateTime CreatedAt { get; set; }
}