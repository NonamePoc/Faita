using AutoMapper;
using Back_End_Service.Chat.Models;
using Back_End_Service.Identity.Entities;
using Back_End_Service.Identity.Models;
namespace Back_End_Service;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<UserModel, User>();

        CreateMap<User, AuthenticateResponse>();

        CreateMap<SendMessageModel, Message>();

        // post model to entity
        CreateMap<CreatePostModel,Posts>();
    }
}