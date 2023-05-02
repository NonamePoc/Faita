using System.Reflection;
using Back_End_Service.Identity.Context;
using Back_End_Service.Identity.Entities;
using Back_End_Service.Post.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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

    public async Task<Posts> CreatePost(CreatePostModel model, string UserId)
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
            UserId = UserId
        };

        _context.Post.Add(post);
        await _context.SaveChangesAsync();

        return post;
    }

    public async Task RepostPost(RepostPostModel model, string UserId)
    {
        var repost = new Repost
        {
            Id = Guid.NewGuid().ToString(),
            PostId = model.PostId,
            UserId = UserId,
            Posts = _context.Post.FirstOrDefault(x => x.Id == model.PostId)
        };

        _context.Repost.Add(repost);
        await _context.SaveChangesAsync();
    }

    public async Task DeletePost(string deletePost)
    {
        var post = _context.Post.FirstOrDefault(x => x.Id == deletePost);

        if (post == null)
        {
            throw new Exception("Post not found");
        }

        _context.Post.Remove(post);
        _context.SaveChanges();
    }

    public async Task<Posts> EditPost(EditPostModel model)
    {
        var post = await _context.Post.FirstOrDefaultAsync(x => x.Id == model.PostId);

        if (post == null)
        {
            throw new Exception("Post not found");
        }

        var properties = model.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance);

        foreach (var property in properties)
        {
            var value = property.GetValue(model);

            if (value != null && !string.IsNullOrEmpty(value.ToString()))
            {
                var postProperty = post.GetType().GetProperty(property.Name);
                if (postProperty != null)
                {
                    postProperty.SetValue(post, value);
                }
            }
        }

        _context.Post.Update(post);
        await _context.SaveChangesAsync();

        var posts = new Posts // создаем объект типа Posts и заполняем его свойства из объекта типа Post
        {
            Id = post.Id,
            Title = post.Title,
            Content = post.Content,
            ImageUrl = post.ImageUrl,
            VideoUrl = post.VideoUrl,
            AudioUrl = post.AudioUrl
        };

        return posts;
    }


    public PostWithUserModel GetPost(string postId)
    {
        var post = _context.Post
            .Include(p => p.User)
            .FirstOrDefault(p => p.Id == postId);

        if (post == null)
        {
            throw new Exception("Post not found");
        }

        return new PostWithUserModel
        {
            Post = post,
            User = post.User
        };
    }


    public async Task<List<object>> GetPostsByUser(string userName)
    {
        var posts = await _context.Post
            .Include(p => p.User)
            .Where(p => p.User.UserName == userName)
            .ToListAsync();

        var user = posts.FirstOrDefault()?.User;

        return posts.Select(p => new
        {
            PostId = p.Id,
            Title = p.Title,
            Content = p.Content,
            CreatedAt = p.CreatedAt,
            User = user == null
                ? null
                : new
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Avatar = user.Avatar
                }
        }).ToList<object>();
    }


    public async Task<PostLike> AddLike(AddLikeModel model, string userId)
    {
        var post = await _context.Post.FindAsync(model.PostId);
        var user = await _userManager.FindByIdAsync(userId);

        if (post == null)
        {
            throw new Exception("Post not found");
        }

        if (user == null)
        {
            throw new Exception("User not found");
        }

        var existingLike =
            await _context.PostLike.FirstOrDefaultAsync(pl => pl.PostId == post.Id && pl.UserId == user.Id);
        if (existingLike != null)
        {
            _context.PostLike.Remove(existingLike);
            await _context.SaveChangesAsync();
            return null; // лайк удален
        }

        var like = new PostLike
        {
            Id = Guid.NewGuid().ToString(),
            PostId = post.Id,
            UserId = user.Id,
            Post = post, // изменено название свойства
            User = user
        };

        _context.PostLike.Add(like);
        await _context.SaveChangesAsync();

        return like;
    }

    public Task RemoveLike(string removeLike)
    {
        var like = _context.PostLike.FirstOrDefault(x => x.Id == removeLike);

        if (like == null)
        {
            throw new Exception("Like not found");
        }

        _context.PostLike.Remove(like);
        _context.SaveChanges();

        return Task.CompletedTask;
    }

    public Comment AddComment(AddCommentModel model, string userId)
    {
        var user = _userManager.FindByIdAsync(userId).Result;

        var comment = new Comment
        {
            Id = Guid.NewGuid().ToString(),
            PostId = model.PostId,
            UserId = userId,
            User = user,
            Content = model.Content,
            CreatedAt = DateTime.Now
        };

        _context.Comment.Add(comment);
        _context.SaveChanges();

        return comment;
    }

    public Task RemoveComment(string RemoveComment)
    {
        var comment = _context.Comment.FirstOrDefault(x => x.Id == RemoveComment);

        if (comment == null)
        {
            throw new Exception("Comment not found");
        }

        _context.Comment.Remove(comment);

        _context.SaveChanges();

        return Task.CompletedTask;
    }

    public Comment EditComment(EditCommentModel model)
    {
        var comment = _context.Comment.FirstOrDefault(x => x.Id == model.CommentId);

        if (comment == null)
        {
            throw new Exception("Comment not found");
        }

        comment.Content = model.Content;

        _context.Comment.Update(comment);
        _context.SaveChanges();


        return comment;
    }

    public List<Comment> GetComments(string getComments)
    {
        var comments = _context.Comment
            .Where(c => c.PostId == getComments)
            .Include(c => c.User)
            .ToList();


        return comments;
    }

    public List<PostLike> GetLikes(string getLikes)
    {
        var likes = _context.PostLike.Where(x => x.PostId == getLikes).ToList();

        return likes;
    }

    public List<PostLike> GetLikesByUser(string UserIdl)
    {
        var likes = _context.PostLike.Where(x => x.UserId == UserIdl).ToList();

        return likes;
    }

    public List<Comment> GetCommentsByUser(string UserId)
    {
        var comments = _context.Comment.Where(x => x.UserId == UserId).ToList();

        return comments;
    }

    public List<Repost> GetReposts(string getReposts)
    {
        var reposts = _context.Repost.Where(x => x.PostId == getReposts).ToList();

        return reposts;
    }

    public List<Repost> GetRepostsByUser(string UserId)
    {
        var reposts = _context.Repost.Where(x => x.UserId == UserId).ToList();

        return reposts;
    }
}