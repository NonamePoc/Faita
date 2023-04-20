namespace Back_End_Service.Identity.Entities;

public class Comment
{
    public string Id { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }

    public string PostId { get; set; }
    public virtual Posts Posts { get; set; }

    public virtual ICollection<CommentLike> Likes { get; set; }
}