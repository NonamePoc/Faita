using System.ComponentModel.DataAnnotations;

namespace Back_End_Service_Identity.Models;

public class AuthenticateRequest
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}