using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ted.Server.Interfaces;
using Ted.Server.Models;

namespace Ted.Server.Web.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        IUserRepository _repo;

        IAuthenticationHandler _auth;

        public UsersController(IUserRepository repo, IAuthenticationHandler auth)
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
            if (_auth.Authenticate(token, id)==null)
                throw new TedExeption(ExceptionCodes.Authentication);

            return Json(new
            {
                success = true,
                data = _repo.GetOne(id)
            });
        }

        [HttpGet]
        public JsonResult Post([FromBody]User value)
        {
            if (string.IsNullOrEmpty(value.FullName))
                throw new ArgumentException(nameof(value.FullName));
            if (string.IsNullOrEmpty(value.Email))
                throw new ArgumentException(nameof(value.FullName));

            _repo.Create(value);
            return Json(new
            {
                success = true,
                data = new { value.Id }
            });
        }

        [HttpPut("{token}/{id}")]
        public void Put(string token, int id, [FromBody]User value)
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
