using Faita.Identity.Entities;
using Faita.Identity.Models;

namespace Faita.Identity.Service;

public interface IUserService
{
    Task<AuthenticateResponse> Authenticate(AuthenticateRequest model);
    Task Register(UserModel userModel, string? route);


    Task ChangePasswordAsync(ChangePasswordModel changePasswordModel, string route, User user);

    Task ChangeEmailAsync(ChangeEmailModel changeEmailModel);

    Task SendRequestChangeEmailAsync(SendChangeEmailModel changeEmailModel, string route, User user);

    Task ChangeUserDataAsync(ChangeUserDataModel changeUserDataModel, User user);


    Task AddAvatarAsync(AddAvatarModel addAvatar, User user);

    Task<User?> GetUser(string userName);
}