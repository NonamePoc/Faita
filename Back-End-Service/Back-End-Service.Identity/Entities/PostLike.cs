namespace Back_End_Service.Identity.Entities;

public class PostLike
{
    public string Id { get; set; }

    public string PostId { get; set; }
    public virtual Posts Post { get; set; }

    public string UserId { get; set; }
    public virtual User User { get; set; }
}