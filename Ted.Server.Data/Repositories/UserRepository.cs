using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Ted.Server.Interfaces;
using Ted.Server.Models;

namespace Ted.Server.Data.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(TedContext context, IConfiguration configuration)
            : base(context, configuration)
        {

        }

        public int Add(User user)
        {
            _db.Add(user);
            _db.SaveChanges();
            return user.Id;
        }

        public void Delete(int id)
        {
            var user = _db.Users.SingleOrDefault(u => u.Id == id);
            if (user == null)
                throw new Exception($"User with Id {id} not found");
            _db.Remove(user);
            _db.SaveChanges();
        }


        public IQueryable<User> GetAll()
        {
            return _db.Users.OrderByDescending(u => u.Id);
        }

        public User GetOne(int id)
        {
            return _db.Users.SingleOrDefault(u => u.Id == id);
        }

        public void Update(int id, User user)
        {
            throw new System.NotImplementedException();
        }
    }
}
