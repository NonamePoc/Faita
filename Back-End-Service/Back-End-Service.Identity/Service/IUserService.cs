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

    Task ChangePasswordAsync(ChangePasswordModel changePasswordModel, string route, User user);
    
    Task ChangeEmailAsync(ChangeEmailModel changeEmailModel);

    Task SendRequestChangeEmailAsync(SendChangeEmailModel changeEmailModel, string route, User user);
    
    Task ChangeUserDataAsync(ChangeUserDataModel changeUserDataModel, User user);
    
    
    Task AddAvatarAsync(AddAvatarModel addAvatar, User user);
    
    Task GetUserId(string userId);
    
}