﻿using Faita.Identity.Entities;

namespace Faita.Identity.Models;

public class AuthenticateResponse
{
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    
    public string Avatars { get; set; }
    public string Token { get; set; }

    public AuthenticateResponse(User user, string token)
    {
        Id = user.Id;
        FirstName = user.FirstName;
        LastName = user.LastName;
        Patronymic = user.Patronymic;
        Username = user.UserName;
        Avatars = user.Avatar;
        Email = user.Email;
        Token = token;
    }
}