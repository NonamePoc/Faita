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
    [HttpDelete("deletePost")]
    public async Task<IActionResult> DeletePost(DeletePostModel model)
    {
        await _postService.DeletePost(model);
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
    [HttpGet("getPost")]
    public IActionResult GetPost(GetPostModel model)
    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (user == null)
        {
            return BadRequest(new { message = "User not found." });
        }

        var post = _postService.GetPost(model);
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
    [HttpDelete("removeLike")]
    public async Task<IActionResult> RemoveLike(RemoveLikeModel model)
    {
        await _postService.RemoveLike(model);
        return Ok();
    }

    [Authorize]
    [HttpPost("addComment")]
    public IActionResult AddComment(AddCommentModel model)

    {
        var user = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        var comment = _postService.AddComment(model,user);

        return Ok(comment);
    }

    [Authorize]
    [HttpDelete("removeComment")]
    public async Task<IActionResult> RemoveComment(RemoveCommentModel model)
    {
        await _postService.RemoveComment(model);
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
    [HttpGet("getComments")]
    public IActionResult GetComments(GetCommentsModel model)
    {
        var comments = _postService.GetComments(model);
        return Ok(comments);
    }

    [Authorize]
    [HttpGet("getLikes")]
    public IActionResult GetLikes(GetLikesModel model)
    {
        var likes = _postService.GetLikes(model);
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
    [HttpGet("getReposts")]
    public IActionResult GetReposts(GetRepostsModel model)
    {
        var reposts = _postService.GetReposts(model);
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