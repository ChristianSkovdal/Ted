using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using Ted.Server.Interfaces;
using Ted.Server.Models;

namespace Ted.Server.Data
{
    public class AuthenticationHandler : BaseDataRepository
    {
        public AuthenticationHandler(TedContext context, IConfiguration configuration, ILogger<BaseDataRepository> logger)
            : base(context, configuration, logger)
        {

        }

        public User Authenticate(string token, int userId)
        {
            var user = _db.Users.SingleOrDefault(u => u.token == token);
            if (user != null && (user.id == userId || user.isSuperUser))
                return user;
            return null;
        }

        public User Authenticate(string token)
        {
            return _db.Users.SingleOrDefault(u => u.token == token);            
        }

        public bool IsSuperUser(string token)
        {
            return Authenticate(token, -1)!=null;
        }

        public User Login(string username, string password)
        {
            var user = _db.Users.SingleOrDefault(u => username.Equals(u.email, StringComparison.OrdinalIgnoreCase) && u.password == password);
            if (user!=null)
            {
                user.token = Guid.NewGuid().ToString("N");
                _db.SaveChanges();
                return user;
            }
            return null;
        }

        public User AuthenticateForWorkspace(string token, int workspaceId)
        {
            var user = Authenticate(token);
            if (user!=null)
            {
                var ws = _db.Workspaces.SingleOrDefault(u => u.id == workspaceId);
                if (ws.id==user.id)
                {
                    return user;
                }
            }
            return null;
        }
    }
}
