using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Ted.Server.Data;
using Ted.Server.Exceptions;
using Ted.Server.Models;

namespace Ted.Server.Web.Controllers
{
    [Route("api/[controller]")]
    public class PageController : Controller
    {
        WorkspaceRepository _repo;

        AuthenticationHandler _auth;

        public PageController(WorkspaceRepository repo, AuthenticationHandler auth)
        {
            _repo = repo;
            _auth = auth;
        }

        [HttpGet("{token}/{id}/{currentWorkspace}")]
        public JsonResult GetPage(string token, int id, int currentWorkspace)
        {
			var page = _repo.GetPage(id);
			if (page == null)
			{
				throw new TedExeption(ExceptionCodes.PageNotFound);
			}

            if (!page.isPublic)
            {
                if (_auth.AuthenticateForWorkspace(token, page.WorkspaceId) == null)
                    throw new TedExeption(ExceptionCodes.Authentication);
            }

            // Load tree
            ICollection<Page> tree = null;
            if (page.WorkspaceId!=currentWorkspace && !page.isPublic)
            {
                tree = _repo.GetNavigationTree(page.WorkspaceId);
            }
            // Avoid cyclic refs
            page.workspace.pages = null;
            return Json(new
			{
				success = true,
				data = page,
                tree
			});
        }

        [HttpPost("{token}/{workspaceId}")]
        public JsonResult AddPage(string token, int workspaceId, [FromBody]Page value)
        {
            var user = _auth.AuthenticateForWorkspace(token, workspaceId);

            if (string.IsNullOrEmpty(value.text))
                throw new ArgumentException(nameof(value.text));

            var page = _repo.AddPage(value, workspaceId, user);

            return Json(new
            {
                success = true,
                data = page
            });
        }

        [HttpPut("{token}/{pageId}")]
        public JsonResult UpdatePage(string token, int pageId, [FromBody]PageUpdate value)
        {
            var page = _repo.GetPage(pageId);
            _auth.AuthenticateForWorkspace(token, page.WorkspaceId);

            _repo.UpdatePage(pageId, value);

            return Json(new
            {
                success = true,
            //    data = value
            });
        }

        //[HttpDelete("{token}/{workspaceId}/{componentId}")]
        //public void DeleteComponent(string token, int workspaceId, string componentId)
        //{
        //    if (_auth.AuthenticateForWorkspace(token, workspaceId) == null)
        //        throw new TedExeption(ExceptionCodes.Authentication);

        //    _repo.DeleteComponent(workspaceId, componentId);
        //}


    }
}
