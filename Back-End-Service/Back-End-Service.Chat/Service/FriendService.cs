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


    public async Task<Friend> AddFriendAsync(AddFriendsModel addFriendsModel)
    {
        var reverseFriend = await _context.Friend
            .FirstOrDefaultAsync(f => f.UserId == addFriendsModel.UserFriendId && f.UserFriendId == addFriendsModel.UserId);
        if (reverseFriend == null)
        {
            reverseFriend = new Friend
            {
                UserId = addFriendsModel.UserFriendId,
                UserFriendId = addFriendsModel.UserId,
                IsAccepted = false
            };

            _context.Friend.Add(reverseFriend);
            await _context.SaveChangesAsync();
        }
        else
        {
            reverseFriend.IsAccepted = true;
            _context.Friend.Update(reverseFriend);
            await _context.SaveChangesAsync();

            var friend = await _context.Friend
                .FirstOrDefaultAsync(f => f.UserId == addFriendsModel.UserId && f.UserFriendId == addFriendsModel.UserFriendId);

            friend.IsAccepted = true;
            _context.Friend.Update(friend);
            await _context.SaveChangesAsync();

            return friend;
        }

        var newFriendRequest = new Friend
        {
            UserId = addFriendsModel.UserId,
            UserFriendId = addFriendsModel.UserFriendId,
            IsAccepted = false // Friend request
        };

        _context.Friend.Add(newFriendRequest);
        await _context.SaveChangesAsync();

        return newFriendRequest;
    }


    public async Task<bool> ConfirmFriendRequestAsync(ConfirmFriendRequestAsyncModel confirmFriendRequestAsyncModel)
    {
        var friend = await _context.Friend
            .FirstOrDefaultAsync(f =>
                f.UserId == confirmFriendRequestAsyncModel.UserId &&
                f.UserFriendId == confirmFriendRequestAsyncModel.UserFriendId && f.IsAccepted == false);

        if (friend == null)
        {
            // Friend request not found
            return false;
        }

        friend.IsAccepted = true;
        _context.Friend.Update(friend);
        await _context.SaveChangesAsync();

        var reverseFriend = await _context.Friend
            .FirstOrDefaultAsync(f =>
                f.UserId == confirmFriendRequestAsyncModel.UserFriendId &&
                f.UserFriendId == confirmFriendRequestAsyncModel.UserId);

        if (reverseFriend != null)
        {
            reverseFriend.IsAccepted = true;
            _context.Friend.Update(reverseFriend);
            await _context.SaveChangesAsync();
        }

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

    public async Task<List<User>> GetFriends(GetFriendsModel getFriendsModel)
    {
        var user = await _userManager.FindByIdAsync(getFriendsModel.UserId);
        if (user == null)
        {
            throw new Exception("User not found");
        }

        var friends = _context.Friend.Select(x => x.UserFriend).ToList();
        return friends;
    }
}