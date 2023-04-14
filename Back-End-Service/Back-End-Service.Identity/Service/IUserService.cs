using System.Security.Principal;
using System.Threading.Tasks;
using Back_End_Service.Identity.Entities;
using Back_End_Service.Identity.Models;


namespace Back_End_Service.Identity.Service;

public interface IUserService
{
    Task<AuthenticateResponse> Authenticate(AuthenticateRequest model);
    Task Register(UserModel userModel, string? route);
    
    Task Logout(string userid);

    Task ChangePasswordAsync(ChangePassword changePassword, string route, User user);
    
    Task ChangeEmailAsync(ChangeEmail changeEmail);

    Task SendRequestChangeEmailAsync(SendChangeEmail changeEmail, string route, User user);
    
    Task ChangeUserDataAsync(ChangeUserData changeUserData, User user);
    
    
    Task GetUserId(string userId);
    
}