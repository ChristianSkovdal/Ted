using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Ted.Server.Data;
using Ted.Server.Exceptions;
using Ted.Server.Models;

namespace Ted.Server.Web.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        DataRepository _repo;

        AuthenticationHandler _auth;

        public DataController(DataRepository repo, AuthenticationHandler auth)
        {
            _repo = repo;
            _auth = auth;
        }


        [HttpGet("{token}/{table}")]
        public JsonResult GetAllRows(string token, string table)
        {
            var tbl = _repo.GetTable(table);

            if (tbl==null)
            {
                return Json(new
                {
                    success = false,
                    code = ExceptionCodes.TableNotFound
                });
            }

            if (!tbl.isPublic)
            {
                var user = _auth.Authenticate(token);
                if (user == null)
                    throw new TedExeption(ExceptionCodes.Authentication);

                if (user.id != tbl.createdBy)
                {
                    throw new TedExeption(ExceptionCodes.Authentication);
                }
            }

            return Json(new
            {
                success = true,
                data = _repo.GetAllRows(table)
            });
        }

        [HttpPost("table/{token}/{table}")]
        public JsonResult CreateTable(string token, string table, [FromBody] dynamic value)
        {
            var user = _auth.Authenticate(token);

            _repo.CreateTable(user, table, value["columns"]);

            if (value["row"] == null)
            {
                var result = _repo.AddRow(table, value);
                return Json(new
                {
                    success = true,
                    data = new
                    {
                        result.id
                    }
                });
            }
            else
            {
                var result = _repo.GetAllRows(table);
                return Json(new
                {
                    success = true,
                    data = result
                });
            }
        }

        [HttpPost("{token}/{table}")]
        public JsonResult AddRow(string token, string table, [FromBody] dynamic value)
        {
            var user = _auth.Authenticate(token);

            var result = _repo.AddRow(table, value);

            if (result == null)
            {
                return Json(new
                {
                    success = false,
                    code = ExceptionCodes.TableNotFound
                });
            }
            else
            {
                return Json(new
                {
                    success = true,
                    data = new
                    {
                        result.id
                    }
                });
            }

        }


        //     [HttpPut("{token}/{id}")]
        //     public void UpdateWorkspace(string token, int id, [FromBody]JObject value)
        //     {
        //         var user = _auth.Authenticate(token);
        //         if (user == null)
        //             throw new TedExeption(ExceptionCodes.Authentication);

        //         _repo.UpdateWorkspace(id, value, user);
        //     }


        //     [HttpDelete("{token}/{id}")]
        //     public void DeleteWorkspace(string token, int id)
        //     {
        //         if (_auth.Authenticate(token) == null)
        //             throw new TedExeption(ExceptionCodes.Authentication);

        //         _repo.DeleteWorkspace(id);
        //     }


    }
}
