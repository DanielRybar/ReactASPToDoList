using Microsoft.EntityFrameworkCore;
using ReactASPToDoList.Helpers;
using ReactASPToDoList.Models;
using System.Security.Cryptography;
using System.Text;
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
            mb.Entity<User>().HasIndex(x => x.UserName).IsUnique();

            string bobikPwd = HashFunctions.ComputeMD5Hash("beruska");
            mb.Entity<User>().HasData(new User { UserId = 1, UserName = "bobik", Password = bobikPwd });
            string jirkaPwd = HashFunctions.ComputeMD5Hash("jirka123");
            mb.Entity<User>().HasData(new User { UserId = 2, UserName = "jirka", Password = jirkaPwd });

            mb.Entity<Task>().HasData(new Task 
            { 
                TaskId = 1, 
                Name = "úkol z PRG", 
                Description = "dokončit binární strom", 
                Finished = false, 
                UserId = 1,   
                Time = new DateTime(2022, 12, 08)
            });
            
            mb.Entity<Task>().HasData(new Task
            {
                TaskId = 2,
                Name = "úkol z ČJL",
                Description = "zpracovat referát o Karlu Čapkovi",
                Finished = true,
                UserId = 2,
                Time = new DateTime(2022, 11, 29)
            });
            mb.Entity<Task>().HasData(new Task
            {
                TaskId = 3,
                Name = "umýt špinavé nádobí",
                Description = "až přijdu domů, tak okamžitě umyji nádobí",
                Finished = false,
                UserId = 2,
                Time = new DateTime(2022, 12, 24)
            });
        }
    }
}
