using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Ted.Server.Data;
using Ted.Server.Exceptions;
using Ted.Server.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System;

namespace Ted.Server.Web.Controllers
{
    [Route("api/[controller]")]
    public class FileController : Controller
    {
        private DataRepository _repo;

        private IHostingEnvironment _env;

        private AuthenticationHandler _auth;

        public FileController(DataRepository repo, AuthenticationHandler auth, IHostingEnvironment env)
        {
            _repo = repo;
            _auth = auth;
            _env = env;
        }

        


        [HttpGet("{token}/{workspaceId}/{fileGuid}")]
        public JsonResult GetFile(string token, int workspaceId, string fileGuid)
        {
            return null;
        }

        [HttpPost("{token}/{workspaceId}/{fileGuid}")]
        public JsonResult UploadFile(string token, int workspaceId, string fileGuid, IFormFile file)
        {
            if (fileGuid == "0")
            {
                fileGuid = Guid.NewGuid().ToString("N");
            }

            var fileDir = Path.Combine(_env.ContentRootPath, $"Workspaces\\{workspaceId}\\Assets\\{fileGuid}");
            Directory.CreateDirectory(fileDir);

            var latestFile = Directory.GetFiles(fileDir).OrderByDescending(f => int.Parse(Path.GetFileNameWithoutExtension(f))).FirstOrDefault();
            latestFile = latestFile ?? "0";
            latestFile = Path.GetFileNameWithoutExtension(latestFile);
            latestFile = (int.Parse(latestFile) + 1).ToString();

            var filePath = Path.Combine(fileDir, latestFile);
            if (file.Length > 0)
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }

            return Json(new
            {
                success = true,
                data = new {
                    fileGuid,
                    version = int.Parse(latestFile)
                }
            });
        }

    }


}

