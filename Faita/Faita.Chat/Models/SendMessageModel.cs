namespace Faita.Chat.Models;

public class SendMessageModel
{
    public string ReceiverId { get; set; }
    public string Text { get; set; }

    public string ChatRoomId { get; set; }
}