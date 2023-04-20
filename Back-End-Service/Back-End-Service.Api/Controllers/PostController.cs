using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back_End_Service.Controllers;

[ApiController]
[Route(Route)]
public class PostController : ControllerBase
{
    private const string Route = "api/[controller]";

    private readonly IPostService _postService;
    
    public PostController(IPostService postService)
    {
        _postService = postService;
    }
    
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreatePost(CreatePostModel model)
    {
        var post = await _postService.CreatePost(model);
        return Ok(post);
    }
    
    [Authorize]
    [HttpPost("repost")]
    public async Task<IActionResult> RepostPost(RepostPostModel model)
    {
        await _postService.RepostPost(model);
        return Ok();
    }
}