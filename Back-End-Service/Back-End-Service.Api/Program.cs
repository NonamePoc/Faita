using System.Text.Json.Serialization;
using Back_End_Service;
using Back_End_Service.Chat;
using Back_End_Service.Identity.Context;
using Back_End_Service.Identity.Service;
using Back_End_Service.Middlware;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication();
// add ServiceCollectionExtensions
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddScoped<IUserService, UserService>();
// use UserManager
builder.Services.AddAutoMapper(typeof(UserProfile));
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Back-End-Service.Api WEB API v1" });
});
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    });

var app = builder.Build();


using var scope = app.Services.CreateScope();
scope.ServiceProvider.GetRequiredService<DataContext>() // create database
    .Database.Migrate();


if (app.Environment.IsDevelopment())
    app.UseDeveloperExceptionPage();

app.UseSwagger();
app.UseSwaggerUI(x => { x.SwaggerEndpoint("/swagger/v1/swagger.json", "Back-End-Service.Api WEB API v1"); });
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        // Встановити заголовки кешування для статичних файлів
        ctx.Context.Response.Headers.Append("Cache-Control", "public, max-age=31536000");
    }
});

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<ChatHub>("/chatHub");
});
app.Run();