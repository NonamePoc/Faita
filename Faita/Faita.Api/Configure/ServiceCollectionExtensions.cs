using System.Text;
using Faita.Chat.Service;
using Faita.Identity.Context;
using Faita.Identity.Entities;
using Faita.Identity.Service;
using Faita.Post.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Faita.Configure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<DataContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("Service-Context-Connection")));
        services.AddIdentity<User, IdentityRole>(options => { })
            .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();


        services.AddAuthentication(option =>
        {
            option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Secret"])),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });


        services.AddScoped<UserManager<User>>();

        services.AddScoped<IBlogService, BlogService>();

        services.AddScoped<IUserService, UserService>();

        services.AddScoped<IMessage, MessageService>();

        services.AddScoped<IdentityUserManager>();

        services.AddScoped<IFriendService, FriendService>();

        services.Configure<IdentityOptions>(options =>
            options.SignIn.RequireConfirmedEmail = true);

        return services;
    }
}