using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back_End_Service.Controllers;

[ApiController]
[Route(Route)]
public class PostController : ControllerBase
{
    private const string Route = "api/post";

    private readonly IPostService _postService;

    public PostController(IPostService postService)
    {
        _postService = postService;
    }

    [Authorize]
    [HttpPost("createPost")]
    public async Task<IActionResult> CreatePost(CreatePostModel model)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        var post = await _postService.CreatePost(model, user);
        return Ok(post);
    }

    [Authorize]
    [HttpDelete("deletePost={deletePost}")]
    public async Task<IActionResult> DeletePost(string deletePost)
    {
        await _postService.DeletePost(deletePost);
        return Ok();
    }

    [Authorize]
    [HttpPost("repost")]
    public async Task<IActionResult> RepostPost(RepostPostModel model)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;


        await _postService.RepostPost(model, user);
        return Ok();
    }

    [Authorize]
    [HttpPost("editPost")]
    public async Task<IActionResult> EditPost(EditPostModel model)
    {
        await _postService.EditPost(model);
        return Ok();
    }

    [Authorize]
    [HttpGet("getPost={getPost}")]
    public IActionResult GetPost(string getPost)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        var post = _postService.GetPost(getPost);
        return Ok(post);
    }


    [Authorize]
    [HttpGet("getPosts")]
    public async Task<IActionResult> GetPosts()
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        var posts = await _postService.GetPosts(user);
        return Ok(posts);
    }

    [Authorize]
    [HttpPost("addLike")]
    public async Task<IActionResult> AddLike(AddLikeModel model)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        var like = await _postService.AddLike(model, user);
        return Ok(like);
    }

    [Authorize]
    [HttpDelete("removeLike={removeLike}")]
    public async Task<IActionResult> RemoveLike(string removeLike)
    {
        await _postService.RemoveLike(removeLike);
        return Ok();
    }

    [Authorize]
    [HttpPost("addComment")]
    public IActionResult AddComment(AddCommentModel model)

    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        var comment = _postService.AddComment(model, user);

        return Ok(comment);
    }

    [Authorize]
    [HttpDelete("removeComment={removeComment}")]
    public async Task<IActionResult> RemoveComment(string removeComment)
    {
        await _postService.RemoveComment(removeComment);
        return Ok();
    }

    [Authorize]
    [HttpPost("editComment")]
    public IActionResult EditComment(EditCommentModel model)
    {
        var comment = _postService.EditComment(model);
        return Ok(comment);
    }


    [Authorize]
    [HttpGet("getComment={getComments}")]
    public IActionResult GetComments(string getComments)
    {
        var comments = _postService.GetComments(getComments);
        return Ok(comments);
    }

    [Authorize]
    [HttpGet("getLike={getLikes}")]
    public IActionResult GetLikes(string getLikes)
    {
        var likes = _postService.GetLikes(getLikes);
        return Ok(likes);
    }

    [Authorize]
    [HttpGet("getLikesByUser")]
    public IActionResult GetLikesByUser()
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        var likes = _postService.GetLikesByUser(user);
        return Ok(likes);
    }

    [Authorize]
    [HttpGet("getCommentsByUser")]
    public IActionResult GetCommentsByUser()
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        var comments = _postService.GetCommentsByUser(user);
        return Ok(comments);
    }

    [Authorize]
    [HttpGet("getRepost={getReposts}")]
    public IActionResult GetReposts(string getReposts)
    {
        var reposts = _postService.GetReposts(getReposts);
        return Ok(reposts);
    }

    [Authorize]
    [HttpGet("getRepostsByUser")]
    public IActionResult GetRepostsByUser()
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        var reposts = _postService.GetRepostsByUser(user);
        return Ok(reposts);
    }
}