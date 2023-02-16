using Back_End_Service_Identity;
using Back_End_Service_Identity.Helpers;
using Back_End_Service_Identity.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("Service-Context-Connection") ?? throw new InvalidOperationException("Connection string 'Service-Context-Connection' not found.");

builder.Services.AddDbContext<DbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddScoped(typeof(IEfRepository<>), typeof(UserRepository<>));      
builder.Services.AddAutoMapper(typeof(UserProfile));
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Back-End-Service WEB API v1" });
});
            
builder.Services.AddScoped<IUserService, UserService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(x =>
    {
        x.SwaggerEndpoint("/swagger/v1/swagger.json", "Back-End-Service WEB API v1");

    });
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    app.UseMiddleware<JwtMiddleware>();
    app.UseEndpoints(x => x.MapControllers());
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();