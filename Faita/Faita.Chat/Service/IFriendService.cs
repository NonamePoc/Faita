using Faita.Chat.Models;
using Faita.Identity.Entities;

namespace Faita.Chat.Service;

public interface IFriendService
{
    Task<FriendRequest> AddFriendAsync(AddFriendsModel addFriendsModel,string userId);
    Task<bool> ConfirmFriendRequestAsync(ConfirmFriendRequestAsyncModel confirmFriendRequestAsyncModel, string userId);
    
    Task<List<User>> GetSendRequest (string userId);

    Task RemoveFriend(string friendId, string userId);

    Task<List<User>> GetFriends(string userId);
    
    Task<List<User>> GetReceiveRequest(string userId);
    
    Task CancelUserFriendRequest(CancelFriendRequestModel cancelFriendRequestAsyncModel, string userId);
    
    Task CancelFriendRequest(CancelFriendRequestModel cancelFriendRequestAsyncModel, string userId);
}