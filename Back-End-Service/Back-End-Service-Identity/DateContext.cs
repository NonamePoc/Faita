using Back_End_Service_Identity.Entities;
using Microsoft.EntityFrameworkCore;

namespace Back_End_Service_Identity;

public class DateContext
{
    public class DataContext: DbContext
    {
        //public DbSet<User> Users { get; set; }

        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }
        
        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    }
}