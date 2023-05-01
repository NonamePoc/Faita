using Back_End_Service.Identity.Entities;

public interface IPostService
{
    Task<Posts> CreatePost(CreatePostModel model, string UserId);

    Task RepostPost(RepostPostModel model, string UserId);

    Task DeletePost(DeletePostModel model);

    Task<Posts> EditPost(EditPostModel model);

    Posts GetPost(string getPost);

    Task<List<Posts>> GetPosts(string UserId);
    

    Task<PostLike> AddLike(AddLikeModel model,string UserId);

    Task RemoveLike(RemoveLikeModel model);

    Comment AddComment(AddCommentModel model, string userId);

    Task RemoveComment(RemoveCommentModel model);

    Comment EditComment(EditCommentModel model);

    List<Comment> GetComments(string getComments);

    List<PostLike> GetLikes(string getLikes);

    List<PostLike> GetLikesByUser(string UserId);

    List<Comment> GetCommentsByUser(string UserIdl);
    
    List<Repost> GetReposts(string getReposts);
    
    List<Repost> GetRepostsByUser(string UserId);
}