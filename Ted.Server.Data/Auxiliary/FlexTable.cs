using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Linq;
using Newtonsoft.Json.Linq;
using Ted.Server.Exceptions;

namespace Ted.Server.Data
{
    internal class FlexTable : IDisposable
    {


        SqlConnection _conn;
        string _tableId;
        public FlexTable(string connectionStr, string tbl)
        {
            _tableId = tbl;
            _conn = new SqlConnection(connectionStr);
            _conn.Open();
        }

        protected T GetScalar<T>(string sql)
        {
            using (SqlCommand command = new SqlCommand(sql, _conn))
            {
                var res = command.ExecuteScalar();
                if (res != null)
                {
                    return (T)res;
                }
            }
            return default(T);
        }

        protected bool GetBoolean(string sql)
        {
            return GetScalar<bool>(sql);
        }
        protected int GetInt(string sql)
        {
            return GetScalar<int>(sql);
        }

        protected string GetString(string sql)
        {
            return GetScalar<string>(sql);
        }
        protected IEnumerable<T> GetValues<T>(string sql)
        {
            using (SqlCommand command = _conn.CreateCommand())
            {
                command.CommandText = sql;
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        yield return (T)reader.GetValue(0);
                    }
                }
            }
        }

        protected int ExecuteSql(string sql, params SqlParameter[] values)
        {
            using (SqlCommand command = new SqlCommand(sql, _conn))
            {
                if (values != null)
                {
                    command.Parameters.AddRange(values);
                }
                return command.ExecuteNonQuery();
            }
        }


        public DataTable Search(string expr, params string[] columns)
        {
            var ftidxcols = GetValues<string>($"SELECT cl.name AS ColumnName FROM  sys.tables t " +
                    $"INNER JOIN sys.fulltext_indexes fi ON t.[object_id] = fi.[object_id] " +
                    $"INNER JOIN sys.fulltext_index_columns ic ON  ic.[object_id] = t.[object_id] " +
                    $"INNER JOIN sys.columns cl ON ic.column_id = cl.column_id AND ic.[object_id] = cl.[object_id] " +
                    $"where t.name = '{_tableId}'").ToList();

            var colStr = "";
            if (columns.Length == 0)
            {
                colStr = "*";
            }
            else
            {
                colStr = columns.Bracketize();
            }

            string ftstr = "";
            for (int i = 0; i < ftidxcols.Count(); i++)
            {
                ftstr += $"FREETEXT({ftidxcols[i]}, '{expr}')";
                if (i < ftidxcols.Count() - 1)
                    ftstr += " OR ";
            }

            return Select($"SELECT {colStr} FROM [{_tableId}] WHERE {ftstr}");
        }

        public DataTable Select(string sql, params object[] values)
        {
            using (SqlCommand command = _conn.CreateCommand())
            {
                command.CommandText = sql;
                if (values.Count() > 0)
                {
                    int index = 0;
                    command.Parameters.AddRange(values.Select(r => new SqlParameter("@p" + index++, r)).ToArray());
                }

                DataTable dt = new DataTable();
                dt.Load(command.ExecuteReader());
                return dt;
            }
        }

        public DataTable Get(string[] columns, int id)
        {
            var sb = new StringBuilder("[\r\n");

            var selectSql = $"SELECT {columns.Bracketize()} FROM [{_tableId}]";
            if (id > 0)
            {
                selectSql += $" WHERE ID=@p0";
            }
            return Select(selectSql, id);
        }

        public bool TableExist()
        {
            return GetInt($"SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '{_tableId}'") == 1;
        }

        public bool ColumnExist(string name)
        {
            return GetInt($"SELECT 1 FROM sys.columns WHERE Name = N'{name}'  AND Object_ID = Object_ID(N'{_tableId}')") == 1;
        }

        public void CreateTable()
        {
            ExecuteSql($"CREATE TABLE [{ _tableId}](id int IDENTITY(1,1) " +
                $"CONSTRAINT pk_{_tableId} PRIMARY KEY (id))");
        }


        //public void CreateBlobColumn(string column)
        //{

        //    SqlTransaction transaction = _conn.BeginTransaction("SampleTransaction"); ;

        //    try
        //    {

        //        var colSql = $"ALTER TABLE [{_tableId}] ADD [{column}] VARBINARY(MAX) NULL";
        //        using (SqlCommand command = new SqlCommand(colSql, _conn))
        //        {
        //            command.Transaction = transaction;
        //            command.ExecuteNonQuery();
        //        }

        //        var typeSql = $"ALTER TABLE [{_tableId}] ADD [{column}_extension] VARCHAR(5) NULL";
        //        using (SqlCommand command = new SqlCommand(typeSql, _conn))
        //        {
        //            command.Transaction = transaction;
        //            command.ExecuteNonQuery();
        //        }

        //        transaction.Commit();
        //        transaction = null;
        //        //                    ftcol = $"ALTER FULLTEXT INDEX ON {_tableId} ADD({ftidx.Bracketize()})";

        //        var indexSql = $"CREATE FULLTEXT INDEX ON {_tableId}({column} TYPE COLUMN {column}_extension LANGUAGE 1033) " +
        //                       $"KEY INDEX pk_{_tableId} ON FTSearch; ";

        //        using (SqlCommand command = new SqlCommand(indexSql, _conn))
        //        {
        //            command.ExecuteNonQuery();
        //        }


        //    }
        //    catch (Exception ex)
        //    {
        //        if (transaction!=null)
        //            transaction.Rollback();
        //        throw;
        //    }

        //}

        public void CreateColumns(dynamic columns)
        {            
            var textSearchColumns = new List<string>();

            foreach (var column in columns)
            {
                var type = column["type"].Value;
                var name = column["name"].Value;

                if (ColumnExist(name))
                {
                    throw new TedExeption(ExceptionCodes.ColumnExist, name);
                }

                string sqltype = "VARCHAR(MAX)";
                switch (type)
                {
                    case "int":
                        sqltype = "INT";
                        break;
                    case "bool":
                        sqltype = "BIT";
                        break;
                    case "float":
                        sqltype = "REAL";
                        break;
                    case "date":
                        sqltype = "DATETIME";
                        break;
                    default:
                        textSearchColumns.Add(name);
                        break;
                }
                
                var createSql = $"ALTER TABLE [{_tableId}] ADD [{name}] {sqltype} NULL";
                ExecuteSql(createSql);
            }

            if (textSearchColumns.Count() > 0)
            {
                var ftixquery = $"SELECT COUNT(*) FROM ( " +
                    $"SELECT t.name AS TableName, cl.name AS ColumnName FROM  sys.tables t  " +
                    $"INNER JOIN sys.fulltext_indexes fi ON t.[object_id] = fi.[object_id]  " +
                    $"INNER JOIN sys.fulltext_index_columns ic ON  ic.[object_id] = t.[object_id] " +
                    $"INNER JOIN sys.columns cl ON ic.column_id = cl.column_id AND ic.[object_id] = cl.[object_id] " +
                    $"where t.name='{_tableId}') AS t " +
                    $"WHERE TableName='{_tableId}'";

                var res = GetInt(ftixquery);

                var ftcol = "";
                if (res == 0)
                {
                    ftcol = $"CREATE FULLTEXT INDEX ON ftCatalog ({textSearchColumns.Bracketize()} LANGUAGE 1033) " +
                        $"KEY INDEX pk_{_tableId} ON FTSearch";
                }
                else
                {
                    ftcol = $"ALTER FULLTEXT INDEX ON {_tableId} ADD({textSearchColumns.Bracketize()})";
                }
                ExecuteSql(ftcol);
            }
        }


        public void DropTable()
        {
            if (!TableExist())
                return; // Throw exception
            var sql = @"DROP TABLE [" + _tableId + "]";
            ExecuteSql(sql);
        }

        public void DropColumn(string name)
        {
            if (!ColumnExist(name))
                throw new Exception();

            var sql = //$"ALTER FULLTEXT INDEX ON [{_tableId}] DISABLE;" +
                        $"ALTER FULLTEXT INDEX ON [{_tableId}] DROP([{name}]);" +
                        $"ALTER TABLE [{_tableId}] DROP COLUMN [{name}];";
            ExecuteSql(sql);
        }

        public void RenameColumn(string name, string newName)
        {
            if (!ColumnExist(name))
                throw new Exception();
            if (ColumnExist(newName))
                throw new Exception();

            var sql = $"EXEC sp_rename '[{_tableId}].[{name}]', '[{newName}]', 'COLUMN';";
            ExecuteSql(sql);
        }

        public void Fill(string jsonStr)
        {
            JObject value = JObject.Parse(jsonStr);

            var empl = (JArray)value["employees"];

            SqlBulkCopy sbCopy = new SqlBulkCopy(_conn)
            {
                DestinationTableName = _tableId
            };

            var tbl = new DataTable(_tableId);

            var sqlColumns = $"SELECT COLUMN_NAME AS [Key], DATA_TYPE AS Value " +
               $"FROM INFORMATION_SCHEMA.COLUMNS " +
               $"WHERE TABLE_NAME = '{_tableId}'";
            SqlCommand command = _conn.CreateCommand();
            command.CommandText = sqlColumns;
            using (SqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    DataColumn idColumn = new DataColumn
                    {
                        DataType = TranslateType(reader.GetString(1)),
                        ColumnName = reader.GetString(0)
                    };
                    tbl.Columns.Add(idColumn);
                }
            }

            foreach (var item in empl.Children())
            {
                var row = tbl.NewRow();
                foreach (JProperty property in item.Children())
                {
                    row[property.Name] = property.Value.ToString();
                }
                tbl.Rows.Add(row);
            }

            sbCopy.WriteToServer(tbl);
        }

        private Type TranslateType(string tn)
        {
            switch (tn)
            {
                case "int":
                    return typeof(int);
                case "varchar":
                    return typeof(string);
                case "datetime":
                    return typeof(DateTime);
                default:
                    break;
            }
            return null;
        }

        public void DeleteRow(int id)
        {
            var sql = $"DELETE FROM [{_tableId}] WHERE ID=@id";
            ExecuteSql(sql, new SqlParameter("id", id));
        }

        public void UpdateRow(string jsonStr, string where)
        {
            JObject obj = JObject.Parse(jsonStr);

            string setClause = "";
            int index = 0;
            int count = obj.Properties().Count();
            var parameters = new SqlParameter[count];
            foreach (JProperty prop in obj.Properties())
            {
                var propVal = prop.Value;
                //if (propVal.Type == JTokenType.String ||
                //    propVal.Type == JTokenType.Date)
                //{
                //    propVal = $"'{propVal}'";
                //}

                parameters[index] = new SqlParameter("@p" + index, propVal.ToString());
                setClause += $"[{prop.Name}]=@p{index++}";
                if (index < count - 1)
                {
                    setClause += ",";
                }

            }

            string sql = $"UPDATE [{_tableId}] SET {setClause} " + where;
            ExecuteSql(sql, parameters);

        }



        public DataTable Pivot(string columnSrc, string sumColName, string quantityColumn)
        {
            using (SqlCommand command = _conn.CreateCommand())
            {
                command.CommandText = $"SELECT DISTINCT {columnSrc} FROM Products";

                //DataTable columnTable = new DataTable();
                //columnTable.Load(command.ExecuteReader());

                //List<string> lstResult = (from table in columnTable.AsEnumerable()
                //                              //where table.Field<int>("Id") == id
                //                          select table.Field<string>("ProductName")).ToList();
                //string coalesceStr = lstResult.FormatJoin("COALESCE([{0}],0)", "+");
                //string columnsStr = lstResult.FormatJoin("[{0}]", ",");

                //string sqlPivot =
                //    $"(select *, " +
                //    $"{coalesceStr} as {sumColName} " +
                //    $"from " +
                //    $"(select * from  " +
                //    $"( " +
                //      $"select CustId, CompanyName, ProductName, Quantity from  " +
                //      $"(select Customers.CustomerID as CustId, Customers.CompanyName as CompanyName, OrderDetails.Quantity as Quantity, Products.ProductName as ProductName " +
                //            $"from Orders " +
                //            $"inner join Customers " +
                //                $"on Orders.CustomerID=Customers.CustomerID " +
                //            $"inner join OrderDetails " +
                //                $"on OrderDetails.OrderID=Orders.OrderID " +
                //            $"inner join Products " +
                //                $"on OrderDetails.ProductID=Products.ProductID " +
                //        $") as T " +
                //    $") src " +
                //    $"pivot " +
                //    $"( " +
                //      $"sum({quantityColumn}) " +
                //      $"for {columnSrc} in ({columnsStr}) " +
                //    $") piv) as X)";

                //command.CommandText = $"SELECT * FROM ({sqlPivot}) AS PIVOTRESULT WHERE {sumColName} > 0";

                DataTable dtPivot = new DataTable();
                dtPivot.Load(command.ExecuteReader());
                return dtPivot;
            }
        }

        public bool ColumnHasData(string cn)
        {
            return false;
        }

        public void Dispose()
        {
            if (_conn != null)
            {
                _conn.Close();
                _conn.Dispose();
            }
        }
    }
}
