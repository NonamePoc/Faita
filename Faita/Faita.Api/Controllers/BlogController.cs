using Faita.Post.Model;
using Faita.Post.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Faita.Controllers;

[Authorize]
[ApiController]
[Route(Route)]
public class BlogController : BaseController
{
    private const string Route = "blog";

    private readonly IBlogService _blogService;

    public BlogController(IBlogService blogService)
    {
        _blogService = blogService;
    }

    [HttpPost("blog")]
    public async Task<IActionResult> CreatePost([FromBody]CreateBlogModel model)
    {
        var user = GetUserId();
        var post = await _blogService.CreatePost(model, user);
        return Ok(post);
    }

    [AllowAnonymous]
    [HttpGet("blog")]
    public IActionResult GetPost([FromQuery] string getPost)
    {
        var post = _blogService.GetPost(getPost);
        return Ok(post);
    }

    [HttpDelete("blog")]
    public async Task<IActionResult> DeletePost([FromQuery] string deletePost)
    {
        await _blogService.DeletePost(deletePost);
        return Ok();
    }

    [AllowAnonymous]
    [HttpGet("blogsByUser")]
    public async Task<IActionResult> GetPosts([FromQuery] string getPostsByUser, int limit = 25, int offset = 0)
    {
        var posts = await _blogService.GetPostsByUser(getPostsByUser, limit, offset);
        return Ok(posts);
    }

    [HttpPut("editBlog")]
    public async Task<IActionResult> EditPost([FromBody]EditBlogModel model)
    {
        await _blogService.EditPost(model);
        return Ok();
    }

    [AllowAnonymous]
    [HttpGet("randomBlog")]
    public async Task<IActionResult> GetRandomPosts([FromQuery] int count)
    {
        var posts = await _blogService.GetRandomPost(count);
        return Ok(posts);
    }

    [HttpPost("repost")]
    public async Task<IActionResult> RepostPost([FromBody]RepostBlogModel model)
    {
        var user = GetUserId();
        await _blogService.RepostPost(model, user);
        return Ok();
    }

    [HttpGet("reposts")]
    public IActionResult GetReposts([FromQuery] string postId)
    {
        var reposts = _blogService.GetReposts(postId);
        return Ok(reposts);
    }

    [HttpGet("repostsByUser")]
    public IActionResult GetRepostsByUser([FromQuery] string userName)
    {
        var reposts = _blogService.GetRepostsByUser(userName);
        return Ok(reposts);
    }


    [HttpPost("like")]
    public async Task<IActionResult> AddLike(AddLikeModel model)
    {
        var user = GetUserId();
        await _blogService.AddLike(model, user);
        return Ok();
    }

    [HttpGet("like")]
    public IActionResult GetLikes([FromQuery] string getLikes)
    {
        var likes = _blogService.GetLikes(getLikes);
        return Ok(likes);
    }

    [HttpGet("likesByUser")]
    public IActionResult GetLikesByUser()
    {
        var user = GetUserId();
        var likes = _blogService.GetLikesByUser(user);
        return Ok(likes);
    }


    [HttpPost("comment")]
    public async Task<IActionResult> AddComment(AddCommentModel model)
    {
        var user = GetUserId();
        await _blogService.AddComment(model, user);

        return Ok();
    }

    [HttpDelete("comment")]
    public async Task<IActionResult> RemoveComment([FromQuery] string removeComment)
    {
        await _blogService.RemoveComment(removeComment);
        return Ok();
    }

    [HttpPut("comment")]
    public IActionResult EditComment([FromBody]EditCommentModel model)
    {
        var comment = _blogService.EditComment(model);
        return Ok(comment);
    }


    [HttpGet("comment")]
    public async Task<IActionResult> GetComments([FromQuery] string postId)
    {
        var comments = await _blogService.GetComments(postId);
        return Ok(comments);
    }

    [HttpGet("commentsByUser")]
    public IActionResult GetCommentsByUser([FromQuery] string userName)
    {
        var comments = _blogService.GetCommentsByUser(userName);
        return Ok(comments);
    }
}