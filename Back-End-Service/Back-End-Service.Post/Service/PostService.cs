using Back_End_Service.Identity.Context;
using Back_End_Service.Identity.Entities;
using Microsoft.AspNetCore.Identity;

namespace Back_End_Service.Post.Service;

public class PostService : IPostService
{
    private readonly UserManager<User> _userManager;

    private readonly DataContext _context;

    public PostService(UserManager<User> userManager, DataContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<Posts> CreatePost(CreatePostModel model)
    {
        var post = new Posts
        {
            Id = Guid.NewGuid().ToString(),
            Title = model.Title,
            Content = model.Content,
            ImageUrl = model.ImageUrl,
            VideoUrl = model.VideoUrl,
            AudioUrl = model.AudioUrl,
            CreatedAt = DateTime.Now,
            UserId = model.UserId
        };

        _context.Post.Add(post);
        await _context.SaveChangesAsync();

        return post;
    }

    public async Task RepostPost(RepostPostModel model)
    {
        var repost = new Repost
        {
            Id = Guid.NewGuid().ToString(),
            PostId = model.PostId,
            UserId = model.UserId,
        };

        _context.Repost.Add(repost);
        await _context.SaveChangesAsync();
    }

    public async Task DeletePost(DeletePostModel model)
    {
        var post = _context.Post.FirstOrDefault(x => x.Id == model.PostId);

        if (post == null)
        {
            throw new Exception("Post not found");
        }

        _context.Post.Remove(post);
        _context.SaveChanges();
    }

    public Task EditPost(EditPostModel model)
    {
        var post = _context.Post.FirstOrDefault(x => x.Id == model.PostId);

        if (post == null)
        {
            throw new Exception("Post not found");
        }

        post.Title = model.Title;
        post.Content = model.Content;
        post.ImageUrl = model.ImageUrl;
        post.VideoUrl = model.VideoUrl;
        post.AudioUrl = model.AudioUrl;

        _context.Post.Update(post);
        _context.SaveChanges();

        return Task.CompletedTask;
    }

    public Task GetPost(GetPostModel model)
    {
        throw new NotImplementedException();
    }

    public Task GetPosts(GetPostModel model)
    {
        throw new NotImplementedException();
    }

    public Task GetPostsByUser(GetPostsByUserModel model)
    {
        throw new NotImplementedException();
    }

    public Task AddLike(AddLikeModel model)
    {
        throw new NotImplementedException();
    }

    public Task RemoveLike(RemoveLikeModel model)
    {
        throw new NotImplementedException();
    }

    public Task AddComment(AddCommentModel model)
    {
        throw new NotImplementedException();
    }

    public Task RemoveComment(RemoveCommentModel model)
    {
        throw new NotImplementedException();
    }

    public Task EditComment(EditCommentModel model)
    {
        throw new NotImplementedException();
    }

    public Task GetComments(GetCommentsModel model)
    {
        throw new NotImplementedException();
    }

    public Task GetLikes(GetLikesModel model)
    {
        throw new NotImplementedException();
    }

    public Task GetLikesByUser(GetLikesByUserModel model)
    {
        throw new NotImplementedException();
    }

    public Task GetCommentsByUser(GetCommentsByUserModel model)
    {
        throw new NotImplementedException();
    }

    public Task GetReposts(GetRepostsModel model)
    {
        throw new NotImplementedException();
    }
}