using Microsoft.EntityFrameworkCore;

namespace Ted.Auxiliary.Logging
{
    public class LoggingDbContext : DbContext
    {
        public LoggingDbContext(DbContextOptions<LoggingDbContext> options)
            : base(options)
        {
			//Database.EnsureCreated();
        }
        public virtual DbSet<LogEvent> EventLog { get; set; }

    }
}