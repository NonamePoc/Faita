using Microsoft.AspNetCore.Identity;

namespace Back_End_Service.Identity.Entities;

public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }

    public bool CanSendGifs { get; set; }
    public bool CanSendEmojis { get; set; }
    
    public string? Avatar { get; set; }
    public ICollection<Friend> FriendsOf { get; set; }
    public ICollection<Friend> Friends { get; set; }

    // Связь между пользователем и отправленными сообщениями
    public ICollection<Message> SentMessages { get; set; }

    // Связь между пользователем и полученными сообщениями
    
    
    public ICollection<Message> ReceivedMessages { get; set; }

    // Связь между пользователем и комнатами чата
    public ICollection<ChatRoom> ChatRooms { get; set; }

    // Связь между пользователем и постами
    public ICollection<Posts> Posts { get; set; }
    

    public virtual ICollection<PostLike> PostLikes { get; set; }
    public virtual ICollection<CommentLike> CommentLikes { get; set; }

    // связь между юзер и репостами
    public ICollection<Repost> Reposts { get; set; }

    // Фотографии пользователя
    public ICollection<Photo> Photos { get; set; }

    // Видеозаписи пользователя
    public ICollection<Video> Videos { get; set; }

    // Аудиозаписи пользователя
    public ICollection<Audio> Audios { get; set; }
}