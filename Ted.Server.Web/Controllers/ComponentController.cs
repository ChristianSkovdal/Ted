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
    public class ComponentController : Controller
    {

        WorkspaceRepository _repo;
        AuthenticationHandler _auth;

        public ComponentController(WorkspaceRepository repo, AuthenticationHandler auth)
        {
            _repo = repo;
            _auth = auth;
        }

        //[HttpPost("{token}/{pageId}")]
        //public void RemoveComponent(string token, int pageId, [FromBody]Page value)
        //{
        //    var page = _repo.GetPage(pageId);
        //    if (page == null)
        //    {
        //        throw new TedExeption(ExceptionCodes.PageNotFound);
        //    }

        //    if (_auth.AuthenticateForWorkspace(token, page.WorkspaceId) == null)
        //    {
        //        throw new TedExeption(ExceptionCodes.Authentication);
        //    }

           

        //}
        //WorkspaceRepository _repo;

        //AuthenticationHandler _auth;

        //public ComponentController(WorkspaceRepository repo, AuthenticationHandler auth)
        //{
        //    _repo = repo;
        //    _auth = auth;
        //}

        //[HttpPut("{token}/{pageId}")]
        //public JsonResult UpdateComponent(string token, int pageId, [FromBody]ComponentUpdate value)
        //{
        //    var page = _repo.GetPage(pageId);

        //    _auth.AuthenticateForWorkspace(token, page.WorkspaceId);

        //    //_repo.UpdatePage(pageId, value);

        //    return Json(new
        //    {
        //        success = true,
        //    });
        //}

    }
}
