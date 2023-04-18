using System.Collections.Generic;
using System.Threading.Tasks;
using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Entities;

namespace Back_End_Service.Chat.Service;

public interface IFriendService
{
    Task<bool> AddFriendAsync(AddFriends addFriends);
    Task<bool> ConfirmFriendRequestAsync(ConfirmFriendRequestAsync confirmFriendRequestAsync);

    Task RemoveFriend(RemoveFriend removeFriend, User user);

    Task<List<User>> GetFriends(GetFriends getFriends);
}