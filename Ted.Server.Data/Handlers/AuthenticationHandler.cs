using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using Ted.Server.Data.Auxiliary;
using Ted.Server.Interfaces;
using Ted.Server.Models;

namespace Ted.Server.Data
{
    public class AuthenticationHandler : BaseDataRepository, IAuthenticationHandler
    {
        public AuthenticationHandler(TedContext context, IConfiguration configuration, ILogger<BaseDataRepository> logger)
            : base(context, configuration, logger)
        {

        }

        public User Authenticate(string token, int userId)
        {
            var user = _db.Users.SingleOrDefault(u => u.Token == token);
            if (user != null && (user.Id == userId || user.IsSuperUser))
                return user;
            return null;
        }

        public bool IsSuperUser(string token)
        {
            return Authenticate(token, -1)!=null;
        }

        public string Login(string username, string password)
        {
            var user = _db.Users.SingleOrDefault(u => username.Equals(u.Email, StringComparison.OrdinalIgnoreCase) && u.Password == password);
            if (user!=null)
            {
                user.Token = Guid.NewGuid().ToString("N");
                _db.SaveChanges();
                return user.Token;
            }
            return null;
        }
    }
}
