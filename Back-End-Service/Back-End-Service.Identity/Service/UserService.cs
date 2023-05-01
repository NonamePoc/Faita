using AutoMapper;
using Back_End_Service.Identity.Entities;
using Back_End_Service.Identity.Helpers;
using Back_End_Service.Identity.Models;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace Back_End_Service.Identity.Service;

public class UserService : IUserService
{
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    private const string emailName = "faitauaofficial";
    private const string emailNameAdd = emailName + "@gmail.com";
    private const string emailPassword = "ysvakfvcfjpqmnom";

    public UserService(
        IConfiguration configuration,
        IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _configuration = configuration;
        _mapper = mapper;
        _userManager = userManager;
        _signInManager = signInManager;
    }


    public async Task Register(UserModel userModel, string? route)
    {
        var user = _mapper.Map<User>(userModel);

        var result = await _userManager.CreateAsync(user, userModel.Password);

        if (!result.Succeeded)
        {
            throw new AggregateException(
                result.Errors.Select(s => new Exception(s.Description)));
        }

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        var confirmationLink =
            route + $"?userid={user.Id}&token={token}";
        await SendEmailAsync(userModel.Email, $"confirm email",
            $"Link confirm email: {confirmationLink} ");
    }


    private async Task SendEmailAsync(string email, string subject, string message)
    {
        using var emailMessage = new MimeMessage();

        emailMessage.From.Add(new MailboxAddress("Faita", "faitauaofficial@gmail.com"));
        emailMessage.To.Add(new MailboxAddress("", email));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        {
            Text = message
        };

        using var client = new SmtpClient();
        {
            await client.ConnectAsync("smtp.gmail.com", 465, true);
            await client.AuthenticateAsync(emailNameAdd, emailPassword);
            await client.SendAsync(emailMessage);
            await client.DisconnectAsync(true);
        }
    }

    public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);

        if (user == null)
        {
            throw new Exception("User not found");
        }

        var result = await _userManager.CheckPasswordAsync(user, model.Password);

        if (!result)
        {
            throw new Exception("Login or Password is incorrect");
        }

        var token = _configuration.GenerateJwtToken(user);

        return new AuthenticateResponse(user, token);
    }

    public async Task ChangePasswordAsync(ChangePasswordModel changePasswordModel, string route, User user)
    {
        if (user == null)
        {
            throw new Exception("User not found");
        }

        var changePasswordResult =
            await _userManager.CheckPasswordAsync(user, changePasswordModel.Password);


        if (!changePasswordResult)
        {
            throw new Exception("Password is incorrect");
        }

        var change =
            await _userManager.ChangePasswordAsync(user, changePasswordModel.Password, changePasswordModel.NewPassword);


        if (!change.Succeeded)
        {
            throw new AggregateException(
                change.Errors.Select(s => new Exception(s.Description)));
        }

        await SendEmailAsync(changePasswordModel.Email, $"confirm password",
            $" Confirm password ");
    }

    public async Task ChangeEmailAsync(ChangeEmailModel changeEmailModel)
    {
        var user = await _userManager.FindByEmailAsync(changeEmailModel.Email);
        var validToken = changeEmailModel.Token.Replace(" ", "+");
        var result = await _userManager.ChangeEmailAsync(user, changeEmailModel.NewEmail, validToken);

        if (!result.Succeeded)
        {
            throw new AggregateException(
                result.Errors.Select(s => new Exception(s.Description)));
        }
    }


    public async Task ChangeUserDataAsync(ChangeUserDataModel changeUserDataModel, User user)
    {
        if (user == null)
        {
            throw new Exception("User not found");
        }

        user.FirstName = changeUserDataModel.FirstName;
        user.LastName = changeUserDataModel.LastName;

        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            throw new AggregateException(
                result.Errors.Select(s => new Exception(s.Description)));
        }
    }

    public Task AddAvatarAsync(AddAvatarModel addAvatar, User user)
    {
        if (user == null)
        {
            throw new Exception("User not found");
        }

        user.Avatar = addAvatar.Avatar;

        var result = _userManager.UpdateAsync(user);

        if (!result.IsCompletedSuccessfully)
        {
            throw new AggregateException(
                result.Exception?.InnerExceptions.Select(s => new Exception(s.Message)) ??
                throw new InvalidOperationException());
        }

        return result;
    }


    public async Task<User?> GetUser(string userName)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == userName);
        
        return user;
    }


    public async Task SendRequestChangeEmailAsync(SendChangeEmailModel changeEmailModel, string route, User user)
    {
        if (user == null)
        {
            throw new Exception("User not found");
        }


        if (user.Email == changeEmailModel.NewEmail)
        {
            throw new Exception("Email is the same");
        }

        var token = await _userManager.GenerateChangeEmailTokenAsync(user, changeEmailModel.NewEmail);
        var validToken = token.Replace(" ", "+");


        if (validToken == null)
        {
            throw new Exception("Token is null");
        }

        var confirmationLink =
            route + $"?email={user.Email}&newEmail={changeEmailModel.NewEmail}&token={validToken}";
        await SendEmailAsync(changeEmailModel.NewEmail, $"link change email",
            $"Link change email: {confirmationLink} ");
    }
}