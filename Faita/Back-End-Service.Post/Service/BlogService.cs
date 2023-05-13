using System.Reflection;
using AutoMapper;
using Faita.Chat.Models;
using Faita.Identity.Context;
using Faita.Identity.Entities;
using Faita.Post.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Faita.Post.Service;

public class BlogService : IBlogService
{
    private readonly UserManager<User> _userManager;

    private readonly DataContext _context;

    private readonly IMapper _mapper;

    public BlogService(UserManager<User> userManager, DataContext context, IMapper mapper)
    {
        _userManager = userManager;
        _context = context;
        _mapper = mapper;
    }

    public async Task<Posts> CreatePost(CreateBlogModel model, string userId)
    {
        var response = _mapper.Map<Posts>(model);
        response.UserId = userId;
        response.CreatedAt = DateTime.Now;
        await _context.Post.AddAsync(response);
        await _context.SaveChangesAsync();

        return response;
    }


    public async Task RepostPost(RepostBlogModel model, string userId)
    {
        var response = _mapper.Map<Repost>(model);

        await _context.Repost.AddAsync(response);
        await _context.SaveChangesAsync();
    }

    public async Task DeletePost(string deletePost)
    {
        var post = _context.Post.Include(p => p.Comments).Include(p => p.Likes)
            .FirstOrDefault(x => x.Id == deletePost);

        // Удаление комментариев
        _context.Comment.RemoveRange(post.Comments);

        // Удаление лайков
        _context.PostLike.RemoveRange(post.Likes);

        // Удаление поста
        _context.Post.Remove(post);

        await _context.SaveChangesAsync();
    }


    public async Task<Posts> EditPost(EditBlogModel model)
    {
        var post = await _context.Post.FirstOrDefaultAsync(x => x.Id == model.PostId);

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

        var response = _mapper.Map<Posts>(post);

        return response;
    }


    public async Task<GetBlogModel> GetPost(string postId)
    {
        var post = _context.Post
            .Include(p => p.User)
            .FirstOrDefault(p => p.Id == postId);

        if (post == null)
        {
            throw new Exception("Post not found");
        }

        var response = _mapper.Map<GetBlogModel>(post);
        return response;
    }

    public async Task<List<GetRandomBlog>> GetRandomPost(int count)
    {
        var randomPosts = await _context.Post
            .Include(p => p.User)
            .OrderBy(x => Guid.NewGuid())
            .Take(count)
            .ToListAsync();

        var response = _mapper.Map<List<GetRandomBlog>>(randomPosts);

        return response;
    }


    public async Task<List<GetBlogByUser>> GetPostsByUser(string userName, int limit = 25, int offset = 0)
    {
        var posts = await _context.Post
            .Include(p => p.User)
            .Where(p => p.User.UserName == userName)
            .OrderByDescending(p => p.CreatedAt)
            .Skip(offset)
            .Take(limit)
            .ToListAsync();

        var response = _mapper.Map<List<GetBlogByUser>>(posts);

        return response;
    }


    public async Task AddLike(AddLikeModel model, string userId)
    {
        var post = await _context.Post.FindAsync(model.PostId);
        var user = await _userManager.FindByIdAsync(userId);

        if (post == null)
        {
            throw new Exception("Post not found");
        }

        var existingLike =
            await _context.PostLike.FirstOrDefaultAsync(pl => pl.PostId == post.Id && pl.UserId == user.Id);

        if (existingLike != null)
        {
            _context.PostLike.Remove(existingLike);
            await _context.SaveChangesAsync();

            return;
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
    }


    public Task AddComment(AddCommentModel model, string userId)
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

        return Task.CompletedTask;
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

    public Task EditComment(EditCommentModel model)
    {
        var comment = _context.Comment.FirstOrDefault(x => x.Id == model.CommentId);

        if (comment == null)
        {
            throw new Exception("Comment not found");
        }

        comment.Content = model.Content;

        _context.Comment.Update(comment);
        _context.SaveChanges();


        return Task.CompletedTask;
    }

    public async Task<List<GetComments>> GetComments(string postId)
    {
        var comments = await _context.Comment
            .Include(c => c.User)
            .Where(c => c.PostId == postId)
            .ToListAsync();

        var response = _mapper.Map<List<GetComments>>(comments);

        return response;
    }


    public List<PostLike> GetLikes(string getLikes)
    {
        var likes = _context.PostLike.Where(x => x.PostId == getLikes).ToList();

        return likes;
    }

    public List<PostLike> GetLikesByUser(string userIdl)
    {
        var likes = _context.PostLike.Where(x => x.UserId == userIdl).ToList();

        return likes;
    }

    public List<Comment> GetCommentsByUser(string UserName)
    {
        var comments = _context.Comment.Where(x => x.User.UserName == UserName).ToList();

        return comments;
    }

    public List<Repost> GetReposts(string postId)
    {
        var reposts = _context.Repost.Where(x => x.PostId == postId).ToList();
        return reposts;
    }

    public List<GetRepostModel> GetRepostsByUser(string UserName)
    {
        var reposts = _context.Repost.Where(x => x.User.UserName == UserName)
            .Include(x => x.User)
            .ToList();

        var response = _mapper.Map<List<GetRepostModel>>(reposts);

        return response;
    }
}