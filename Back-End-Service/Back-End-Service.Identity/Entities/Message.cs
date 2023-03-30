namespace Back_End_Service.Identity.Entities;

public class Message
{
    public int Id { get; set; }
    
    public string Text { get; set; }
    
    // userId
    public string SenderId { get; set; }
    
    // friendId
    public string ReceiverId { get; set; }

    public DateTime CreateAt { get; set; }
}