using Back_End_Service.Identity.Entities;

namespace Back_End_Service.Post.Model;

public class PostWithUserModel
{
    public Posts Post { get; set; }
    public User User { get; set; }
}