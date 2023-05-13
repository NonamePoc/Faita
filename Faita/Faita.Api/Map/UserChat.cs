using AutoMapper;
using Faita.Chat.Models;
using Faita.Identity.Entities;

namespace Faita.Map;

public class UserChat : Profile
{
    public UserChat()
    {
        CreateMap<CreateChatRoomModel, ChatRoom>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid().ToString()))
            .ForMember(dest => dest.Users,
                opt => opt.MapFrom((src, dest) => new List<User> { dest.Users.First(), dest.Users.Last() }));

        CreateMap<CreateChatRoomModel, ChatRoom>()
            .ForMember(dest => dest.Users, opt => opt.Ignore()); // игнорировать свойство Users

        CreateMap<ChatRoom, GetChatRoomsModel>()
            .ForMember(dest => dest.ChatId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.ChatName, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Users, opt => opt.MapFrom(src => src.Users))
            .ForMember(dest => dest.Messages, opt => opt.MapFrom(src => src.Messages));

        CreateMap<User, GetChatRoomUserModel>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.Avatar));

        CreateMap<Message, GetChatRoomMessageModel>()
            .ForMember(dest => dest.MessageId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
            .ForMember(dest => dest.SenderId, opt => opt.MapFrom(src => src.SenderId))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));
        
        CreateMap<SendMessageModel, Message>();
    }
}