namespace Faita.Chat.DTO;

public class ExistingFriendship
{
    public string UserId { get; set; }
    public string UserFriendId { get; set; }
    public bool IsAccepted { get; set; }
}