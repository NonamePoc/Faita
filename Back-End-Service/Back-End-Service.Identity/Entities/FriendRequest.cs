namespace Back_End_Service.Identity.Entities;

public class FriendRequest
{
    public FriendRequest()
    {
        Id = Guid.NewGuid().ToString();
    }
    
    public string Id { get; set; }

    public string UserId { get; set; }
    public User User { get; set; }

    public string UserFriendId { get; set; }
    public User UserFriend { get; set; }

    public bool IsAccepted { get; set; }
}