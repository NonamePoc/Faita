namespace Back_End_Service.Identity.Entities;

public class Comment
{
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }

    public int PostId { get; set; }
    public virtual Post Post { get; set; }

    public virtual ICollection<CommentLike> Likes { get; set; }
}