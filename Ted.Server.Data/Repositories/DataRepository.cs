using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Ted.Server.Data.Auxiliary;
using Ted.Server.Exceptions;
using Ted.Server.Models;

namespace Ted.Server.Data
{
    public class DataRepository : BaseDataRepository
    {

        public DataRepository()
            : base(null, null, null)
        {

        }

        public DataRepository(TedContext context, IConfiguration configuration)
            : base(context, configuration)
        {

        }

        public IEnumerable<dynamic> GetAllRows(string tableName)
        {
            using (var tbl = new FlexTable(_config.GetConnectionString("DefaultConnection"), tableName))
            {
                var dt = tbl.Select($"SELECT * FROM [{tableName}]");
                return dt.AsDynamicEnumerable();
            }
        }

        private List<string> GetDynamicPropertyName(dynamic value)
        {
            var list = new List<string>();
            foreach (var prop in value)
            {
                list.Add(prop.Path);
            }
            return list;
        }

        public int? AddRows(string tableName, dynamic value)
        {
            using (var tbl = new FlexTable(_config.GetConnectionString("DefaultConnection"), tableName))
            {
                if (!tbl.TableExist())
                {
                    return null;
                }

                // Is there any columns on value which is not in the table?
                //var existing = tbl.GetColumnNames();
                //var incoming = GetDynamicPropertyName(value);

                //foreach (var coldef in incoming)
                //{
                //    if (!existing.Contains(coldef))
                //    {
                //        //tbl.CreateColumn(columnDef["name"], columnDef["type"]);
                //    }
                //}
                
                tbl.Fill(value);
                return tbl.GetInt($"SELECT TOP (1) [id] FROM [{tableName}] ORDER BY [id] DESC");
            }
        }

        public void CreateTable(User user, string tableName, dynamic columns)
        {
            // Add meta data
            var table = new Table
            {
                name = tableName,
                createdTime = DateTime.Now,
                createdBy = user.id
            };

            if (_db.Tables.Any(t => t.name == tableName))
                throw new TedExeption(ExceptionCodes.Generic, $"Table {table} already exist");

            _db.Tables.Add(table);
            _db.SaveChanges();

            using (var tbl = new FlexTable(_config.GetConnectionString("DefaultConnection"), tableName))
            {
                tbl.CreateTable();

                tbl.CreateColumns(columns);
            }
        }

        public Table GetTable(string name)
        {
            return _db.Tables.SingleOrDefault(t => t.name==name);
        }

        public void DeleteRow(int id, string table)
        {
            using (var tbl = new FlexTable(_config.GetConnectionString("DefaultConnection"), table))
            {
                tbl.DeleteRow(id);
            }
        }
    }
}
