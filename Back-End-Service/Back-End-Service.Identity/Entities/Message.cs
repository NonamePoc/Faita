using System;

namespace Back_End_Service.Identity.Entities;

public class Message
{
    public string Id { get; set; }
    public string Text { get; set; }

    public string SenderId { get; set; }
    public User Sender { get; set; }

    public string ReceiverId { get; set; }
    public User Receiver { get; set; }
    
    public string ChatRoomId { get; set; }

    public DateTime CreatedAt { get; set; }
}