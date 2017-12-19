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

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("version")]
        public string Version()
        {
            return "TED v1.0";
        }


        // GET api/values/5
        [HttpGet("seed")]
        public JsonResult Seed()
        {
            return Json(_repo.Seed());
        }
        

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
