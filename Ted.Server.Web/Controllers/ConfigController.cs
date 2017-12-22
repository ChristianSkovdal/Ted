using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ted.Server.Data;
using Ted.Server.Interfaces;

namespace Ted.Server.Web.Controllers
{
    [Route("api/[controller]")]
    public class ConfigController : Controller
    {
        ConfigRepository _repo;

        public ConfigController(ConfigRepository repo)
        {
            _repo = repo;
        }


        // GET api/values/5
        [HttpGet("version")]
        public JsonResult Version()
        {
            return Json(new {
                FullVersion= "TED v1.0",
                MajorVersion=1,
                MinorVersion=0
            });
        }

        // GET api/values/5
        [HttpGet("seed/{email}")]
        public JsonResult Seed(string email)
        {
            return Json(_repo.Seed(email));
        }
        

    }
}
