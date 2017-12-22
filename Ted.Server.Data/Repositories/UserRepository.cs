using System;
using System.Linq;
using System.Reflection;
using FastMember;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Ted.Server.Exceptions;
using Ted.Server.Interfaces;
using Ted.Server.Models;

namespace Ted.Server.Data
{
    public class UserRepository : BaseDataRepository
    {
        public UserRepository()
            : base(null, null, null)
        {

        }

        public UserRepository(TedContext context, IConfiguration configuration)
            : base(context, configuration)
        {

        }
        private void NeuterUser(User user)
        {
            user.isSuperUser = false;
            user.modifiedTime = DateTime.Now;
            user.workspaceList = null;
        }

        public int Create(User user)
        {
            // Are there already a user with the email address
            if (_db.Users.Any(u => u.email !=null && u.email.Equals(user.email, StringComparison.OrdinalIgnoreCase)))
            {
                throw new TedExeption(ExceptionCodes.UserExist);
            }

            NeuterUser(user);
            user.createdTime = DateTime.Now;
            user.createdBy = user;

            _db.Add(user);
            user.createdTime = DateTime.Now;
            _db.SaveChanges();
            return user.id;
        }

        public void Delete(int id)
        {
            var user = _db.Users.SingleOrDefault(u => u.id == id);
            if (user == null)
                throw new Exception($"User with Id {id} not found");
            //_db.Remove(user);
            user.modifiedTime = DateTime.Now;
            user.deleted = true;

            foreach (var ws in user.myWorkspaces)
            {
                ws.deleted = true;
            }

            _db.SaveChanges();
        }


        public IQueryable<User> GetAll()
        {
            return _db.Users.Where(u => !u.deleted).OrderByDescending(u => u.id);
        }

        public User GetOne(int id)
        {
            return _db.Users.SingleOrDefault(u => u.id == id && !u.deleted);
        }

        public void Update(int id, JObject data)
        {
            var user = GetOne(id);

            Update(user,data);

            //foreach (var prop in data)
            //{
            //    string propName = prop.Key;
            //    JToken propValue = prop.Value;

            //    PropertyInfo propInfo = user.GetType().GetProperty(propName);
            //    if (propInfo == null)
            //        throw new TedExeption(ExceptionCodes.Generic, $"Cannot get property {propName} for user {id}");
            //    var value = Convert.ChangeType(propValue.ToString(), propInfo.PropertyType);
            //    propInfo.SetValue(user, value);
            //}

            NeuterUser(user);
            user.modifiedTime = DateTime.Now;

            _db.SaveChanges();
        }
    }
}
