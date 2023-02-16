using Back_End_Service.DataAccess.Implementations.Entities;
using Microsoft.EntityFrameworkCore;
using Route = Microsoft.AspNetCore.Routing.Route;

namespace Back_End_Service.DataAccess.Implementations;


public class DataContext: DbContext
{
    public DbSet<Boat> Boats { get; set; }
    public DbSet<Person> Persons { get; set; }
    public DbSet<Route> Routes { get; set; }
    public DbSet<RoutePoint> RoutePoints { get; set; }
    public DbSet<Skipper> Skippers { get; set; }
    public DbSet<TripOrder> TripOrders { get; set; }

    public DataContext(DbContextOptions<DataContext> options): base(options)
    {
    }
}