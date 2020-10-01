using dailyTasks.Models;
using Microsoft.EntityFrameworkCore;

namespace dailyTasks.Persistence
{
    public class DailyTasksDbContext : DbContext
    {
        public DbSet<DailyTasks> DailyTasks { get; set; }

        public DbSet<Tasks> Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite("Data Source=database.db");
    }
}