using AutoMapper;
using Faita.Chat.DTO;
using Faita.Chat.Models;
using Faita.Identity.Entities;

namespace Faita.Map;

public class UserFriend : Profile
{
    public UserFriend()
    {
        // mapping friend
        CreateMap<AddFriendsModel, FriendRequest>();
        CreateMap<FriendRequest, Friend>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.UserFriendId, opt => opt.MapFrom(src => src.UserFriendId))
            .AfterMap((src, dest) => dest.IsAccepted = true);

        CreateMap<ConfirmFriendRequestAsyncModel, FriendRequest>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom((src, dest, _, context) => context.Items["UserId"]))
            .ForMember(dest => dest.UserFriendId, opt => opt.MapFrom(src => src.UserFriendId));

        CreateMap<ConfirmFriendRequestAsyncModel, Friend>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom((src, dest, _, context) => context.Items["UserId"]))
            .ForMember(dest => dest.UserFriendId, opt => opt.MapFrom(src => src.UserFriendId))
            .ForMember(dest => dest.IsAccepted, opt => opt.MapFrom(src => true));


        CreateMap<Friend, ExistingFriendship>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.UserFriendId, opt => opt.MapFrom(src => src.UserFriendId));
    }
}