using Back_End_Service.DataAccess.Contracts;
using Back_End_Service.DataAccess.Implementations;
using Microsoft.EntityFrameworkCore;

namespace Back_End_Service;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        return services
            .AddDbContext<DataContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")))
            .AddScoped(typeof(IDbRepository<>), typeof(DbRepository<>));
    }
}