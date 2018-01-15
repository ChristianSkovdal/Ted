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
            throw new NotImplementedException();
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
            using (var tbl = new FlexTable(_config.GetConnectionString("DefaultConnection"), tableName))
            {
                tbl.CreateTable();

                tbl.CreateColumns(columns);

            }

        }
    }
}
