using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ted.Server.Data.Repositories
{
    public class BaseRepository
    {
        protected TedContext db;


        public BaseRepository(TedContext context, IConfiguration configuration)
        {
            db = context;
            //var optionsBuilder = new DbContextOptionsBuilder<TedContext>();
            //var connStr = configuration.GetConnectionString("DefaultConnection");
            //optionsBuilder.UseSqlServer(connStr);
            //db = new TedContext(optionsBuilder.Options);
        }

        public void Dispose()
        {
            if (db != null)
                db.Dispose();
        }
    }
}
