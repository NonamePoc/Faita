using Back_End_Service.Identity.Context;
using Back_End_Service.Identity.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;
using Back_End_Service.Chat.Service;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Back_End_Service;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<DataContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("Service-Context-Connection")));
        services.AddScoped<IdentityUserManager>();
        services.AddIdentity<User, IdentityRole>(options =>
            {
                // здесь настройки Identity, если требуется
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();
        services.AddSignalR(); 
        services.AddScoped<IMessage, MessageService>();
        
        services.AddScoped<IFriendService, FriendService>();
        services.Configure<IdentityOptions>(options =>
            options.SignIn.RequireConfirmedEmail = true);
        
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
        // add cors 
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",
                builder => builder
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
        });
        services.AddScoped<UserManager<User>>();

        return services;
    }
}