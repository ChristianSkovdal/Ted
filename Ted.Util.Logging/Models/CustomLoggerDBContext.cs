using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace Ted.Util.Logging
{
    public partial class CustomLoggerDBContext : DbContext
    {      
        public virtual DbSet<EventLog> EventLog { get; set; }

        public static string ConnectionString { get; set; }

        public static int MessageMaxLength;

        public CustomLoggerDBContext(DbContextOptions<CustomLoggerDBContext> options)
            : base(options)
        {

        }


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    MessageMaxLength = 4000;
        //    optionsBuilder.UseSqlServer(ConnectionString);
        //    base.OnConfiguring(optionsBuilder);
        //}
        
    }
}