using System.Text.Json.Serialization;
using Back_End_Service.Identity.Service;
using Microsoft.AspNetCore.Identity;

namespace Back_End_Service.Identity.Entities;

public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    
}