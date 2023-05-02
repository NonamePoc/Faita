using Back_End_Service.Identity.Entities;

namespace Back_End_Service.Identity.Models;

public class AuthenticateResponse
{
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    
    public string Avatar { get; set; }
    public string Token { get; set; }

    public AuthenticateResponse(User user, string token)
    {
        Id = user.Id;
        FirstName = user.FirstName;
        LastName = user.LastName;
        Patronymic = user.Patronymic;
        Username = user.UserName;
        Avatar = user.Avatar;
        Email = user.Email;
        Token = token;
    }
}