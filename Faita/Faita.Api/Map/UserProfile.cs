using AutoMapper;
using Faita.Identity.Entities;
using Faita.Identity.Models;

namespace Faita.Map
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            // mapping user 
            CreateMap<UserModel, User>();

            CreateMap<User, AuthenticateResponse>();
        }
    }
}