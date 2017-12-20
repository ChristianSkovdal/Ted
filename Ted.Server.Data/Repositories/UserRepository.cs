using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Ted.Server.Data.Auxiliary;
using Ted.Server.Interfaces;
using Ted.Server.Models;

namespace Ted.Server.Data.Repositories
{
    public class UserRepository : BaseDataRepository, IUserRepository
    {
        public UserRepository()
            : base(null, null, null)
        {

        }

        public UserRepository(TedContext context, IConfiguration configuration)
            : base(context, configuration)
        {

        }

        public int Create(User user)
        {
            _db.Add(user);
            user.CreatedTime = DateTime.Now;
            _db.SaveChanges();
            return user.Id;
        }

        public void Delete(int id)
        {
            var user = _db.Users.SingleOrDefault(u => u.Id == id);
            if (user == null)
                throw new Exception($"User with Id {id} not found");
            //_db.Remove(user);
            user.ModifiedTime = DateTime.Now;
            user.Deleted = true;

            foreach (var ws in user.MyWorkspaces)
            {
                ws.Deleted = true;
            }

            _db.SaveChanges();
        }


        public IQueryable<User> GetAll()
        {
            return _db.Users.Where(u => !u.Deleted).OrderByDescending(u => u.Id);
        }

        public User GetOne(int id)
        {
            return _db.Users.SingleOrDefault(u => u.Id == id && !u.Deleted);
        }

        public void Update(int id, User user)
        {
            user.ModifiedTime=DateTime.Now;
        }
    }
}
