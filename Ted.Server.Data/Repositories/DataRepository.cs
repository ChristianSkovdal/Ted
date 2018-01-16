using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
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

        public object GetAllRows(string table)
        {
            return new[] {
                    new {
                        col1= "Hans"
                    },
                    new {
                        col1= "Jens"
                    },
                    new {
                        col1= "Peter"
                    },
                };
        }

        public object AddRow(string tableName, dynamic value)
        {
            using (var tbl = new FlexTable(_config.GetConnectionString("DefaultConnection"), tableName))
            {
                if (!tbl.TableExist())
                {
                    return null;
                }

            }
            return null;
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
    }
}
