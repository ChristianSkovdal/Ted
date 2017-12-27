using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Ted.Server.Data;
using Ted.Server.Exceptions;
using Ted.Server.Models;

namespace Ted.Server.Web.Controllers
{
    [Route("api/[controller]")]
    public class WorkspaceController : Controller
    {
        WorkspaceRepository _repo;

        AuthenticationHandler _auth;

        public WorkspaceController(WorkspaceRepository repo, AuthenticationHandler auth)
        {
            _repo = repo;
            _auth = auth;
        }

        [HttpGet("{token}/{workspaceId}")]
        public JsonResult GetOne(string token, int workspaceId)
        {
            if (_auth.Authenticate(token)==null)
                throw new TedExeption(ExceptionCodes.Authentication);

            return Json(new
            {
                success = true,
                data = _repo.GetOne(workspaceId)
            });
        }

        [HttpGet("{token}")]
        public JsonResult GetAllForUser(string token)
        {
            var user = _auth.Authenticate(token);
            if (user==null)
                throw new TedExeption(ExceptionCodes.Authentication);
            
            return Json(new
            {
                success = true,
                data = _repo.GetAllForUser(user)
            });
        }

        [HttpPost("{token}")]
        public JsonResult AddWorkspace(string token, [FromBody]Workspace value)
        {
            var user = _auth.Authenticate(token);

            if (string.IsNullOrEmpty(value.name))
                throw new ArgumentException(nameof(value.name));

            _repo.Create(value, user);

            return Json(new
            {
                success = true,
                data = value
            });
        }

        [HttpPut("{token}/{id}")]
        public void UpdateWorkspace(string token, int id, [FromBody]JObject value)
        {
            var user = _auth.Authenticate(token);
            if (user == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            _repo.Update(id, value, user);
        }


        [HttpDelete("{token}/{id}")]
        public void DeleteWorkspace(string token, int id)
        {
            if (_auth.Authenticate(token) == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            _repo.Delete(id);
        }
    }
}
