namespace Back_End_Service.Identity.Entities;

public class ChatRoom
{
    public string Id { get; set; }
    public string Name { get; set; } // Название комнаты чата
    public ICollection<User> Users { get; set; } // Пользователи, присоединенные к комнате
    public ICollection<Message> Messages { get; set; } // Сообщения в комнате
}