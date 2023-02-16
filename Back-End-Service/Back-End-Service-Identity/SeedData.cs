using Back_End_Service_Identity.Entities;

namespace Back_End_Service_Identity;

public class SeedData
{
    public static List<User> Users = new List<User>
    {
        new User
        {
            Id = 1, 
            FirstName = "Test", 
            LastName = "User", 
            Patronymic = "UserPatr", 
            Email = "test@mail.ru", 
            Username = "test", 
            Password = "test"
        }
    };
}