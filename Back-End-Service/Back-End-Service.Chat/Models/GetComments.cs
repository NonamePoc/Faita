namespace Back_End_Service.Chat.Models;

public class GetComments
{
    public string CommentId { get; set; }
    
    public string PostId { get; set; }
    
    public string UserId { get; set; }
    
    public string Content { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public string UserName { get; set; }
    
    public string Avatar { get; set; }
}