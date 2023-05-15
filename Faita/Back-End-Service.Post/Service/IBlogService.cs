using Faita.Chat.Models;
using Faita.Identity.Entities;
using Faita.Post.Model;

namespace Faita.Post.Service;

public interface IBlogService
{
    Task<Posts> CreatePost(CreateBlogModel model, string UserId);

    Task RepostPost(RepostBlogModel model, string UserId);

    Task DeletePost(string deletePost);

    Task<Posts> EditPost(EditBlogModel model);

    Task<GetBlogModel> GetPost(string getPost);
    
    Task<List<GetRandomBlog>> GetRandomPost(int count);

    Task<List<GetBlogByUser>> GetPostsByUser(string userName, int limit, int offset);


    Task AddLike(AddLikeModel model, string UserId);


    Task AddComment(AddCommentModel model, string userId);

    Task RemoveComment(string removeComment);

    Task EditComment(EditCommentModel model);

    Task<List<GetComments>> GetComments(string postId);

    List<PostLike> GetLikes(string getLikes);

    List<PostLike> GetLikesByUser(string UserId);

    List<Comment> GetCommentsByUser(string UserName);

    List<Repost> GetReposts(string postId);

    List<GetRepostModel> GetRepostsByUser(string UserId);
    
    
}