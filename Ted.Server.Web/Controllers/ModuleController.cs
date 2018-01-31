using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Ted.Server.Data;
using Ted.Server.Exceptions;
using Ted.Server.Models;

namespace Ted.Server.Web.Controllers
{
    [Route("api/[controller]")]
    public class ModuleController : Controller
    {
        ModuleRepository _repo;

        AuthenticationHandler _auth;

        public ModuleController(ModuleRepository repo, AuthenticationHandler auth)
        {
            _repo = repo;
            _auth = auth;
        }


        [HttpGet("{token}/{workspaceId}")]
        public JsonResult GetAllForWorkspace(string token, int workspaceId)
        {
            var user = _auth.AuthenticateForWorkspace(token, workspaceId);
            if (user == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            return Json(new
            {
                success = true,
                data = _repo.GetAllForWorkspace(workspaceId)
            });
        }

        [HttpGet("{token}")]
        public JsonResult GetAll(string token)
        {
            var user = _auth.Authenticate(token);
            if (user == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            return Json(new
            {
                success = true,
                data = _repo.GetAllForUser(user)
            });
        }

        [HttpPost("{token}/{workspaceId}")]
        public JsonResult Add(string token, int workspaceId, [FromBody] Module value)
        {
            var user = _auth.AuthenticateForWorkspace(token, workspaceId);

            if (string.IsNullOrEmpty(value.name))
                throw new ArgumentException(nameof(value.name));

			//var ws = new Workspace(value);
			_repo.AddModule(value, workspaceId, user);

            return Json(new
            {
                success = true,
                data = value
			});
        }

        [HttpPut("{token}/{workspaceId}/{id}")]
        public void Update(string token, int workspaceId, int id, [FromBody]JObject value)
        {
            var user = _auth.Authenticate(token);
            if (user == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            _repo.UpdateModule(id, value, user);
        }


        [HttpDelete("{token}/{workspaceId}/{id}")]
        public void DeleteWorkspace(string token, int workspaceId, int id)
        {
            var user = _auth.Authenticate(token);
            if (user == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            _repo.DeleteModule(id, user);
        }


    }
}
