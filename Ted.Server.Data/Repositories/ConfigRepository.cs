using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using Ted.Server.Interfaces;
using Ted.Server.Models;
using Microsoft.Extensions.Logging;

namespace Ted.Server.Data
{
    public class ConfigRepository : BaseDataRepository
    {
        public ConfigRepository(TedContext context, IConfiguration configuration, ILogger<BaseDataRepository> logger)
            : base(context, configuration, logger)
        {

        }

        public object Seed(string email)
        {
            _logger.LogInformation("Seed() was called");

            if (!_db.Users.Any(u => u.fullName == "Admin"))
            {
                var admin = new User
                {
                    fullName = "Admin",
                    email = email,
                    password = Guid.NewGuid().ToString("N").Substring(0, 10),
                    isSuperUser = true
                };

                _db.Users.Add(admin);
                _db.SaveChanges();

                return new
                {
                    success = true,
                    id = admin.id,
                    password = admin.password
                };
            }

            return new
            {
                success = false
            };
        }
    }
}
