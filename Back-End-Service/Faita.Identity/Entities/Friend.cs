namespace Faita.Identity.Entities;

public class Friend
{
    public string UserId { get; set; }
    public User User { get; set; }

    public string UserFriendId { get; set; }
    public User UserFriend { get; set; }
    
    public bool IsAccepted { get; set; }
}