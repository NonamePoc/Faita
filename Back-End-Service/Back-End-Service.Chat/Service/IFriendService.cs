using System.Collections.Generic;
using System.Threading.Tasks;
using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Entities;

namespace Back_End_Service.Chat.Service;

public interface IFriendService
{
    Task<FriendRequest> AddFriendAsync(AddFriendsModel addFriendsModel,string UserId);
    Task<bool> ConfirmFriendRequestAsync(ConfirmFriendRequestAsyncModel confirmFriendRequestAsyncModel, string UserId);
    
    Task<List<User>> GetSendRequest (string UserId);

    Task RemoveFriend(RemoveFriendModel removeFriendModel, User user);

    Task<List<User>> GetFriends(string UserId);
    
    Task<List<User>> GetReceiveRequest(string UserId);
    
    Task<bool> CancelUserFriendRequest (CancelFriendRequestModel cancelFriendRequestAsyncModel, string UserId);
    
    Task<bool> CancelFriendRequest (CancelFriendRequestModel cancelFriendRequestAsyncModel, string UserId);
}