namespace Faita.Identity.Entities;

public class Posts
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
    public string ImageUrl { get; set; }
    public string VideoUrl { get; set; }
    public string AudioUrl { get; set; }


    public string UserId { get; set; }
    public virtual User User { get; set; }

    public virtual ICollection<PostLike> Likes { get; set; }
    public virtual ICollection<Comment> Comments { get; set; }
}