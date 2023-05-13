namespace Faita.Identity.Models;

public class UserModel
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string UserName { get; set; }

    public string Patronymic { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}