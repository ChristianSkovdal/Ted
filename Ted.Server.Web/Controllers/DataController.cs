﻿using System.Linq;
using System.Collections.Generic;
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

            if (tbl == null)
            {
                return Json(new
                {
                    success = false,
                    code = ExceptionCodes.TableNotFound
                });
            }

            if (!_auth.AuthenticateForTable(token, table))
                throw new TedExeption(ExceptionCodes.Authentication);

            return Json(new
            {
                success = true,
                data = _repo.GetAllRows(table).OrderByDescending(r => r.id)
            });
        }

        [HttpPost("table/create/{token}/{table}")]
        public void CreateTable(string token, string table, [FromBody] dynamic value)
        {
            var user = _auth.Authenticate(token);

            _repo.CreateTable(user, table, value["columns"], value["masterTableId"]?.Value); 
        }

        [HttpPost("{token}/{table}")]
        public JsonResult AddRow(string token, string table, [FromBody] dynamic value)
        {
            if (!_auth.AuthenticateForTable(token, table))
                throw new TedExeption(ExceptionCodes.Authentication);

            var list = new List<dynamic>()
            {
                value
            };
            int? inserted = _repo.AddRows(table, list);

            return Json(new
            {
                success = true,
                data = new
                {
                    id = inserted
                }
            });

        }


        [HttpPut("{token}/{table}/{id}")]
        public void Update(string token, string table, int id, [FromBody]dynamic value)
        {
            if (!_auth.AuthenticateForTable(token, table))
                throw new TedExeption(ExceptionCodes.Authentication);

            _repo.UpdateField(id, value, table);
        }


        [HttpDelete("{token}/{table}/{id}")]
        public void DeleteRow(string token, string table, int id)
        {
            if (!_auth.AuthenticateForTable(token, table))
                throw new TedExeption(ExceptionCodes.Authentication);

            _repo.DeleteRow(id, table);
        }


    }
}
