using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Context;
using Back_End_Service.Identity.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace Back_End_Service.Chat.Service;

public class FriendService : IFriendService
{
    private readonly UserManager<User> _userManager;

    private readonly DataContext _context;

    public FriendService(UserManager<User> userManager1, DataContext context)
    {
        _userManager = userManager1;
        _context = context;
    }


    public async Task<FriendRequest> AddFriendAsync(AddFriendsModel addFriendsModel, string UserId)
    {
        // Check if users are already friends
        if (await _context.Friend.AnyAsync(f =>
                f.UserId == UserId && f.UserFriendId == addFriendsModel.UserFriendId && f.IsAccepted))
        {
            throw new Exception("Users are already friends");
        }

        // Check if friend request already exists
        if (await _context.FriendRequest.AnyAsync(fr =>
                fr.UserId == UserId && fr.UserFriendId == addFriendsModel.UserFriendId))
        {
            throw new Exception("Friend request already sent");
        }

        // Add friend request
        var friendRequest = new FriendRequest
        {
            UserId = UserId,
            UserFriendId = addFriendsModel.UserFriendId,
            IsAccepted = false
        };
        _context.FriendRequest.Add(friendRequest);
        await _context.SaveChangesAsync();

        return friendRequest;
    }


    public async Task<bool> ConfirmFriendRequestAsync(ConfirmFriendRequestAsyncModel confirmFriendRequestAsyncModel, string userId)
    {
        // Check if the user and friend are already friends
        var existingFriendship = await _context.Friend.FirstOrDefaultAsync(x =>
            (x.UserId == userId && x.UserFriendId == confirmFriendRequestAsyncModel.UserFriendId) ||
            (x.UserId == confirmFriendRequestAsyncModel.UserFriendId &&
             x.UserFriendId == userId));

        if (existingFriendship != null)
        {
            // Users are already friends
            return false;
        }

        // Check if there is already a friend request sent from user to friend
        var existingFriendRequest = await _context.FriendRequest.FirstOrDefaultAsync(x =>
            x.UserId == confirmFriendRequestAsyncModel.UserFriendId && x.UserFriendId == userId &&
            x.IsAccepted == false);

        if (existingFriendRequest == null)
        {
            // Friend request does not exist
            return false;
        }

        // Add friend
        var friend = new Friend
        {
            UserId = userId,
            UserFriendId = confirmFriendRequestAsyncModel.UserFriendId,
            IsAccepted = true
        };
        _context.Friend.Add(friend);

        // Remove friend request
        _context.FriendRequest.Remove(existingFriendRequest);

        await _context.SaveChangesAsync();

        return true;
    }



    public async Task RemoveFriend(RemoveFriendModel removeFriendModel, User user)
    {
        if (user == null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        if (user.Friends == null)
        {
            user.Friends = new List<Friend>();
        }

        var friend = _context.Friend.FirstOrDefault(x => x.UserFriendId == removeFriendModel.FriendId);

        if (friend == null)
        {
            throw new Exception("User not found");
        }

        user.Friends.Remove(friend);

        if (friend.UserFriend?.FriendsOf != null)
        {
            friend.UserFriend.FriendsOf.Remove(friend);
        }

        await _userManager.UpdateAsync(user);
    }

    public async Task<List<User>> GetFriends(string UserId)
    {
        var friends = await _context.Friend
            .Where(f => (f.UserId == UserId || f.UserFriendId == UserId) && f.IsAccepted == true)
            .ToListAsync();

        var friendList = new List<User>();
        foreach (var friend in friends)
        {
            var user = friend.UserId == UserId ? friend.UserFriend : friend.User;
            friendList.Add(user);
        }

        return friendList;
    }

    public async Task<List<User>> GetReceiveRequest(string UserId)
    {
        var friendRequests = await _context.FriendRequest
            .Where(fr => fr.UserFriendId == UserId && fr.IsAccepted == false)
            .Include(fr => fr.User)
            .ToListAsync();

        return friendRequests.Select(fr => fr.User).ToList();
    }

    public async Task<List<User>> GetSendRequest(string userId)
    {
        var friendRequestsSent = await _context.FriendRequest
            .Where(fr => fr.UserId == userId && fr.IsAccepted == false)
            .Include(fr => fr.UserFriend)
            .ToListAsync();

        return friendRequestsSent.Select(fr => fr.UserFriend).ToList();
    }

    public async Task<bool> CancelUserFriendRequest(CancelFriendRequestModel model, string userId)
    {
        var friendRequest = await _context.FriendRequest
            .FirstOrDefaultAsync(fr => fr.UserId == userId && fr.UserFriendId == model.UserFriendId);

        if (friendRequest == null)
        {
            return false;
        }

        _context.FriendRequest.Remove(friendRequest);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> CancelFriendRequest(CancelFriendRequestModel cancelFriendRequestModel, string userId)
    {
        // Check if friend request exists and is not already accepted
        var existingFriendRequest = await _context.FriendRequest.FirstOrDefaultAsync(x =>
            x.UserId == userId && x.UserFriendId == cancelFriendRequestModel.UserFriendId &&
            x.IsAccepted == false);

        if (existingFriendRequest != null)
        {
            // Remove friend request
            _context.FriendRequest.Remove(existingFriendRequest);
            await _context.SaveChangesAsync();

            return true;
        }

        return false;
    }
}