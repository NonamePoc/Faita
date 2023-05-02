using Back_End_Service.Identity.Entities;

public interface IPostService
{
    Task<Posts> CreatePost(CreatePostModel model, string UserId);

    Task RepostPost(RepostPostModel model, string UserId);

    Task DeletePost(string deletePost);

    Task<Posts> EditPost(EditPostModel model);

    object GetPost(string getPost);

    Task<List<object>> GetPostsByUser(string UserName);
    

    Task<PostLike> AddLike(AddLikeModel model,string UserId);

    Task RemoveLike(string removeLike);

    Comment AddComment(AddCommentModel model, string userId);

    Task RemoveComment(string removeComment);

    Comment EditComment(EditCommentModel model);

    List<Comment> GetComments(string getComments);

    List<PostLike> GetLikes(string getLikes);

    List<PostLike> GetLikesByUser(string UserId);

    List<Comment> GetCommentsByUser(string UserIdl);
    
    List<Repost> GetReposts(string getReposts);
    
    List<Repost> GetRepostsByUser(string UserId);
}