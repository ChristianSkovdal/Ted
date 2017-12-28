using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Ted.Server.Data;
using Ted.Server.Exceptions;
using Ted.Server.Models;

namespace Ted.Server.Web.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        UserRepository _repo;

        AuthenticationHandler _auth;

        public UserController(UserRepository repo, AuthenticationHandler auth)
        {
            _repo = repo;
            _auth = auth;
        }

        [HttpGet("{token}")]
        public JsonResult Get(string token)
        {
            if (!_auth.IsSuperUser(token))
                throw new TedExeption(ExceptionCodes.NotSuperUser);

            return Json(new
            {
                success = true,
                data = _repo.GetAll()
            });
        }

        [HttpGet("{token}/{id}")]
        public JsonResult Get(string token, int id)
        {
            if (_auth.Authenticate(token, id)==null && !_auth.IsSuperUser(token))
                throw new TedExeption(ExceptionCodes.Authentication);

            return Json(new
            {
                success = true,
                data = _repo.GetOne(id)
            });
        }

        [HttpPost]
        public JsonResult Post([FromBody]User value)
        {
            if (string.IsNullOrEmpty(value.fullName))
                throw new ArgumentException(nameof(value.fullName));
            if (string.IsNullOrEmpty(value.email))
                throw new ArgumentException(nameof(value.email));
            if (string.IsNullOrEmpty(value.password))
                throw new ArgumentException(nameof(value.password));

            _repo.Create(value);

            return Json(new
            {
                success = true,
                data = new { id = value.id }
            });
        }

        [HttpPost("login")]
        public JsonResult Login([FromBody]Login value)
        {
            if (string.IsNullOrEmpty(value.email))
                throw new ArgumentException(nameof(value.email));
            if (string.IsNullOrEmpty(value.password))
                throw new ArgumentException(nameof(value.password));

            var user = _auth.Login(value.email, value.password);
            if (user==null)
            {
                return Json(new
                {
                    success = false
                });
            }
            else
            {
                return Json(new
                {
                    success = true,
                    data = user
                });
            }
            
        }

        [HttpPut("{token}/{id}")]
        public void Put(string token, int id, [FromBody]JObject value)
        {
            if (_auth.Authenticate(token, id) == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            _repo.Update(id, value);
        }


        [HttpDelete("{token}/{id}")]
        public void Delete(string token, int id)
        {
            if (_auth.Authenticate(token, id) == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            _repo.Delete(id);
        }
    }
}
