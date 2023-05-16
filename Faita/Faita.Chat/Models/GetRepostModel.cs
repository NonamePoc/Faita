namespace Faita.Chat.Models;

public class GetRepostModel
{
    public string Id { get; set; }
    
    public string PostId { get; set; }
    
    public string UserId { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public string UserName { get; set; }
    
    public string Avatar { get; set; }
}