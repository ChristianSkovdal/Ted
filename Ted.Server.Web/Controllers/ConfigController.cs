using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ted.Server.Interfaces;

namespace Ted.Server.Web.Controllers
{
    [Route("api/[controller]")]
    public class ConfigController : Controller
    {
        IConfigRepository _repo;

        public ConfigController(IConfigRepository repo)
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
        [HttpGet("seed")]
        public JsonResult Seed()
        {
            return Json(_repo.Seed());
        }
        

    }
}
