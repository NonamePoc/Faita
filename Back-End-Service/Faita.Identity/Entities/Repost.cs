namespace Faita.Identity.Entities;

public class Repost
{
    public string Id { get; set; }
    public string PostId { get; set; }
    public Posts Posts { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
    
    public DateTime CreatedAt  { get; set; }
}