using Microsoft.EntityFrameworkCore;
using ReactASPToDoList.Models;

namespace ReactASPToDoList.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
