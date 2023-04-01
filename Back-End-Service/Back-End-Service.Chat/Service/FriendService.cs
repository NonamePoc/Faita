using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Context;
using Back_End_Service.Identity.Entities;
using Microsoft.AspNetCore.Identity;


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


    public async Task AddFriend(AddFriends addFriends, User user)
    {
        var friend = await _userManager.FindByIdAsync(addFriends.FriendId);
        if (friend == null)
        {
            throw new Exception("User not found");
        }

        var friendEntity = new Friend
        {
            UserId = addFriends.UserId,
            UserFriendId = addFriends.FriendId,
            User = user,
            UserFriend = friend
        };


        if (user.Friends == null)
        {
            user.Friends = new List<Friend>();
        }

        user.Friends.Add(friendEntity);

        if (friend.FriendsOf == null)
        {
            friend.FriendsOf = new List<Friend>();
        }

        friend.FriendsOf.Add(friendEntity);

        if (_userManager == null)
        {
            throw new Exception("_userManager is null");
        }

        await _userManager.UpdateAsync(user);
        await _userManager.UpdateAsync(friend);
    }

    public async Task RemoveFriend(RemoveFriend removeFriend, User user)
    {
        if (user == null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        if (user.Friends == null)
        {
            user.Friends = new List<Friend>();
        }

        var friend = _context.Friend.FirstOrDefault(x => x.UserFriendId == removeFriend.FriendId);

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

    public async Task<List<User>> GetFriends(GetFriends getFriends)
    {
        var user = await _userManager.FindByIdAsync(getFriends.UserId);
        if (user == null)
        {
            throw new Exception("User not found");
        }

        var friends = _context.Friend.Select(x => x.UserFriend).ToList();
        return friends;
    }
}