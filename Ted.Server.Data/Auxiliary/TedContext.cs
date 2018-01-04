using Microsoft.EntityFrameworkCore;
using System;
using Ted.Server.Models;

namespace Ted.Server.Data
{
    public class TedContext : DbContext
    {

        public TedContext(DbContextOptions<TedContext> options)
            : base(options)
        {
			Database.EnsureCreated();
		}
        
        public DbSet<User> Users { get; set; }

        public DbSet<Workspace> Workspaces { get; set; }

		public DbSet<Page> Pages { get; set; }

		//public DbSet<TreeNode> TreeNode { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UsersInGroups>()
                .HasKey(t => new { t.userId, t.groupId });
        }
    }
}
