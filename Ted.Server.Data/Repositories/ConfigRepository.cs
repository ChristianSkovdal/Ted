using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using Ted.Server.Interfaces;
using Ted.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ted.Server.Data.Repositories
{
    public class ConfigRepository : BaseRepository, IConfigRepository
    {
        public ConfigRepository(TedContext context, IConfiguration configuration, ILogger<BaseRepository> logger)
            : base(context, configuration, logger)
        {

        }

        public object Seed()
        {
            _logger.LogInformation("Seed() was called");
            if (!_db.Users.Any(u => u.FullName == "Admin"))
            {
                var admin = new User
                {
                    FullName = "Admin",
                    Password = Guid.NewGuid().ToString("N").Substring(0, 10),
                    IsMainAdmin = true
                };

                _db.Users.Add(admin);
                _db.SaveChanges();

                return new {
                    success = true,
                    Id = admin.Id,
                    password = admin.Password
                };
            }

            return new
            {
                success = false
            };
        }
}
}
