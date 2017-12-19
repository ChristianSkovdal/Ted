using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using Ted.Server.Interfaces;
using Ted.Server.Models;
using Microsoft.EntityFrameworkCore;


namespace Ted.Server.Data.Repositories
{
    public class ConfigRepository : BaseRepository, IConfigRepository
    {
        public ConfigRepository(TedContext context, IConfiguration configuration)
            : base(context, configuration)
        {

        }

        public object Seed()
        {

            if (!db.Users.Any(u => u.FullName == "Admin"))
            {
                var admin = new User
                {
                    FullName = "Admin",
                    Password = Guid.NewGuid().ToString("N").Substring(0, 6)
                };

                db.Users.Add(admin);
                db.SaveChanges();

                return new {
                    success = true,
                    Id = admin.Id,
                    password = admin.Password,
                    IsMainAdmin = true
                };
            }

            return new
            {
                success = false
            };
        }
}
}
