using System.Text.Json.Serialization;
using Back_End_Service.Identity.Service;
using Microsoft.AspNetCore.Identity;

namespace Back_End_Service.Identity.Entities;

public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    
    public bool CanSendGifs { get; set; }
    public bool CanSendEmojis { get; set; }
    public ICollection<Friend> FriendsOf { get; set; }
    public ICollection<Friend> Friends { get; set; }
    
    // Связь между пользователем и отправленными сообщениями
    public ICollection<Message> SentMessages { get; set; }

    // Связь между пользователем и полученными сообщениями
    public ICollection<Message> ReceivedMessages { get; set; }
}