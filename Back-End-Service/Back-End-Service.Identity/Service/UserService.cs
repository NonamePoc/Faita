using System;
using System.Linq;
using System.Security.Policy;
using System.Security.Principal;
using System.Threading.Tasks;
using AutoMapper;
using Back_End_Service.Identity.Entities;
using Back_End_Service.Identity.Helpers;
using Back_End_Service.Identity.Models;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace Back_End_Service.Identity.Service;

public class UserService : IUserService
{
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    private const string emailName = "faitauaofficial";
    private const string emailNameAdd = emailName + "@gmail.com";
    private const string emailPassword = "ysvakfvcfjpqmnom";

    public UserService(
        IConfiguration configuration,
        IMapper mapper, UserManager<User> userManager)
    {
        _configuration = configuration;
        _mapper = mapper;
        _userManager = userManager;
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

    public async Task Logout(string userid)
    {
        var user = await _userManager.FindByIdAsync(userid);
        if (user == null)
        {
            throw new Exception("User not found");
        }

        await _userManager.UpdateSecurityStampAsync(user);
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

    public async Task ChangePasswordAsync(ChangePassword changePassword, string route, User user)
    {
        if (user == null)
        {
            throw new Exception("User not found");
        }

        var changePasswordResult =
            await _userManager.CheckPasswordAsync(user, changePassword.Password);


        if (!changePasswordResult)
        {
            throw new Exception("Password is incorrect");
        }

        var change =
            await _userManager.ChangePasswordAsync(user, changePassword.Password, changePassword.NewPassword);


        if (!change.Succeeded)
        {
            throw new AggregateException(
                change.Errors.Select(s => new Exception(s.Description)));
        }

        await SendEmailAsync(changePassword.Email, $"confirm password",
            $" Confirm password ");
    }

    public async Task ChangeEmailAsync(ChangeEmail changeEmail, string route, User user)
    {
        var validToken = changeEmail.Token.Replace(" ", "+");
        var result = await _userManager.ChangeEmailAsync(user, changeEmail.NewEmail, validToken);

        if (!result.Succeeded)
        {
            throw new AggregateException(
                result.Errors.Select(s => new Exception(s.Description)));
        }
    }


    
    public async Task ChangeUserDataAsync(ChangeUserData changeUserData, User user)
    {
        if (user == null)
        {
            throw new Exception("User not found");
        }

        user.FirstName = changeUserData.FirstName;
        user.LastName = changeUserData.LastName;

        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            throw new AggregateException(
                result.Errors.Select(s => new Exception(s.Description)));
        }
    }

    public Task GetUserId (string userId)
    {
        var user = _userManager.FindByIdAsync(userId);
        return user;
    }
    
    
    public async Task SendRequestChangeEmailAsync(SendChangeEmail changeEmail, string route, User user)
    {
        if (user == null)
        {
            throw new Exception("User not found");
        }


        var token = await _userManager.GenerateChangeEmailTokenAsync(user, changeEmail.NewEmail);


        if (token == null)
        {
            throw new Exception("Token is null");
        }

        var confirmationLink =
            route + $"?userId={user.Id}&token={token}";
        await SendEmailAsync(changeEmail.NewEmail, $"link change email",
            $"Link change email: {confirmationLink} ");
    }
}