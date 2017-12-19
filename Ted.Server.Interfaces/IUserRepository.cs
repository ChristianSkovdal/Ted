using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ted.Server.Models;

namespace Ted.Server.Interfaces
{
    public interface IUserRepository
    {
        int Add(User user);

        void Update(int id, User user);

        void Delete(int id);

        IQueryable<User> GetAll();

        User GetOne(int id);
    }
}
