namespace Back_End_Service.Chat.Models;

public class SendMessageModel
{
    public string UserId { get; set; }
    public string ReceiverId { get; set; }
    public string Text { get; set; }
}