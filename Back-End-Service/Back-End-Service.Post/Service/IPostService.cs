using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Entities;
using Back_End_Service.Post.Model;

public interface IPostService
{
    Task<Posts> CreatePost(CreatePostModel model, string UserId);

    Task RepostPost(RepostPostModel model, string UserId);

    Task DeletePost(string deletePost);

    Task<Posts> EditPost(EditPostModel model);

    Task<GetPostModel> GetPost(string getPost);

    Task<List<GetPostsByUser>> GetPostsByUser(string userName, int limit, int offset);


    Task<PostLike> AddLike(AddLikeModel model, string UserId);


    Comment AddComment(AddCommentModel model, string userId);

    Task RemoveComment(string removeComment);

    Comment EditComment(EditCommentModel model);

    Task<List<GetComments>> GetComments(string postId);

    List<PostLike> GetLikes(string getLikes);

    List<PostLike> GetLikesByUser(string UserId);

    List<Comment> GetCommentsByUser(string UserName);

    List<Repost> GetReposts(string postId);

    List<GetRepostModel> GetRepostsByUser(string UserId);
}