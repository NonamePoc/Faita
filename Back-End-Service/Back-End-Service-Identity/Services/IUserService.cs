using Back_End_Service_Identity.Entities;
using Back_End_Service_Identity.Models;

namespace Back_End_Service_Identity.Services;

public interface IUserService
{
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    Task<AuthenticateResponse> Register(UserModel userModel);
    IEnumerable<User> GetAll();
    User GetById(int id);
}