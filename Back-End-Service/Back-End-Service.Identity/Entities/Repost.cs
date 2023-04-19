namespace Back_End_Service.Identity.Entities;

public class Repost
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public Post Post { get; set; }
    public string UserId { get; set; }
    public User User { get; set; }
}