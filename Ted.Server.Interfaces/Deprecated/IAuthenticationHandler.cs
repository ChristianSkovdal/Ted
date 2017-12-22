using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ted.Server.Models;

namespace Ted.Server.Interfaces
{
    public interface IAuthenticationHandler
    {
        string Login(string username, string password);

        User Authenticate(string token, int userId);

        bool IsSuperUser(string token);
    }
}
