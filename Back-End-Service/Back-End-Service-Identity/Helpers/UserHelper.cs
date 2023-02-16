using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Back_End_Service_Identity.Entities;
using Microsoft.IdentityModel.Tokens;

namespace Back_End_Service_Identity.Helpers;

public static class UserHelper
{
    public static string GenerateJwtToken(this IConfiguration configuration, User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(configuration["Secret"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}