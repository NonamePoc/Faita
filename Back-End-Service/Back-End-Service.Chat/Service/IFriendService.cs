using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Entities;

namespace Back_End_Service.Chat.Service;

public interface IFriendService
{
    Task AddFriend(AddFriends addFriends, User user);

    Task RemoveFriend(RemoveFriend removeFriend, User user);

    Task<List<User>> GetFriends(GetFriends getFriends);
}