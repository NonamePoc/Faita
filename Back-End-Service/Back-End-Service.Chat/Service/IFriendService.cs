using System.Collections.Generic;
using System.Threading.Tasks;
using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Entities;

namespace Back_End_Service.Chat.Service;

public interface IFriendService
{
    Task<Friend> AddFriendAsync(AddFriendsModel addFriendsModel);
    Task<bool> ConfirmFriendRequestAsync(ConfirmFriendRequestAsyncModel confirmFriendRequestAsyncModel);

    Task RemoveFriend(RemoveFriendModel removeFriendModel, User user);

    Task<List<User>> GetFriends(GetFriendsModel getFriendsModel);
}