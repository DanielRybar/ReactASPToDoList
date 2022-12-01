using Microsoft.EntityFrameworkCore;
using ReactASPToDoList.Models;
using Task = ReactASPToDoList.Models.Task;

namespace ReactASPToDoList.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);
            mb.Entity<User>().HasData(new User { UserId = 1, UserName = "bobik", Password = "beruska" });

            mb.Entity<Task>().HasData(new Task 
            { 
                TaskId = 1, 
                Name = "úkol z PRG", 
                Description = "Dodělat binární strom", 
                Finished = false, 
                UserId = 1,   
                Time = DateTime.Now
            });
        }
    }
}
