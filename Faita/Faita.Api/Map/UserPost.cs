using AutoMapper;
using Faita.Chat.Models;
using Faita.Identity.Entities;
using Faita.Post.Model;

namespace Faita.Map;

public class UserPost : Profile
{
    public UserPost()
    {
        // mapping posts 
        CreateMap<CreateBlogModel, Posts>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid().ToString()));

        CreateMap<Posts, GetBlogModel>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
            .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.User.Avatar))
            .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.Id));

        CreateMap<Posts, GetBlogsModel>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
            .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.User.Avatar))
            .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.Id));


        CreateMap<Repost, GetRepostModel>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.PostId))
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
            .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.User.Avatar));

        CreateMap<Comment, GetComments>()
            .ForMember(dest => dest.CommentId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
            .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.User.Avatar));

        CreateMap<RepostBlogModel, Repost>();

        CreateMap<EditBlogModel, Posts>();

        CreateMap<GetBlogModel, Posts>();

        CreateMap<GetRandomBlog, Posts>();

        CreateMap<Posts, GetBlogByUser>()
            .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
            .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
            .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.User.Avatar))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.ImageUrl))
            .ForMember(dest => dest.VideoUrl, opt => opt.MapFrom(src => src.VideoUrl))
            .ForMember(dest => dest.AudioUrl, opt => opt.MapFrom(src => src.AudioUrl));

        CreateMap<Posts, GetRandomBlog>()
           .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.Id))
           .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
           .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.User.Avatar))
           .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.ImageUrl))
           .ForMember(dest => dest.VideoUrl, opt => opt.MapFrom(src => src.VideoUrl))
           .ForMember(dest => dest.AudioUrl, opt => opt.MapFrom(src => src.AudioUrl));

    }
}
