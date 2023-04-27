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
    [HttpPost ("createPost")]
    public async Task<IActionResult> CreatePost(CreatePostModel model)
    {
        var post = await _postService.CreatePost(model);
        return Ok(post);
    }
    
    [Authorize]
    [HttpDelete ("deletePost")]
    public async Task<IActionResult> DeletePost(DeletePostModel model)
    {
        await _postService.DeletePost(model);
        return Ok();
    }
    
    [Authorize]
    [HttpPost("repost")]
    public async Task<IActionResult> RepostPost(RepostPostModel model)
    {
        await _postService.RepostPost(model);
        return Ok();
    }
}