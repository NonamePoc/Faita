namespace Faita.Post.Model
{
   public class GetBlogModel
    {
        public string? PostId { get; set; }

        public string? Title { get; set; }

        public string? Content { get; set; }

        public DateTime CreatedAt { get; set; }

        public string Avatar { get; set; }

        public string UserName { get; set; }

        public string UserId { get; set; }
        
        public string ImageUrl { get; set; }
        
        public string VideoUrl { get; set; }
        
        public string AudioUrl { get; set; }
    }
}