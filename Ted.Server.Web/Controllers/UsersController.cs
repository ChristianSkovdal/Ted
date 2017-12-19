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

        public UsersController(IUserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public JsonResult Get()
        {
            return Json(new
            {
                success = true,
                data = _repo.GetAll()
            });
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            return Json(new
            {
                success = true,
                data = _repo.GetOne(id)
            });
        }

        [HttpPost]
        public JsonResult Post([FromBody]string value)
        {
            _repo.Add(value);
            return Json(new
            {
                success = true,
                data = new { value.Id }
            });
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]User value)
        {
            _repo.Update(id, value);
        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _repo.Delete(id)
        }
    }
}
