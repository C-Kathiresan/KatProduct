using Microsoft.EntityFrameworkCore;
using ProductApi.Model;

namespace ProductApi.DBSYS
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {  }

        public DbSet<Product> Products { get; set; }
    }
}
