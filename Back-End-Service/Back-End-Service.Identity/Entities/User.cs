using System.Text.Json.Serialization;

namespace Back_End_Service.Identity.Entities;

public class User : IBaseEntity
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Patronymic { get; set; }

    public string Username { get; set; }

    public string Email { get; set; }

    [JsonIgnore] 
    public HashSet<string> Password { get; set; }
}