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
                data = _repo.GetOneWorkspace(workspaceId)
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
                data = _repo.GetAllWorkspacesForUser(user)
            });
        }

        [HttpPost("{token}")]
        public JsonResult AddWorkspace(string token, WorkspaceDTO value)
        {
            var user = _auth.Authenticate(token);

            if (string.IsNullOrEmpty(value.name))
                throw new ArgumentException(nameof(value.name));

            _repo.CreateWorkspace(value, user);

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

            _repo.UpdateWorkspace(id, value, user);
        }


        [HttpDelete("{token}/{id}")]
        public void DeleteWorkspace(string token, int id)
        {
            if (_auth.Authenticate(token) == null)
                throw new TedExeption(ExceptionCodes.Authentication);

            _repo.DeleteWorkspace(id);
        }


    }
}
