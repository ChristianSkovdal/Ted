using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ted.Server.Data.Auxiliary;
using System.Data.Common;
using System;
using System.Data;

namespace Ted.Test.Auxiliary
{

    public class TestBase<INTERFACE_REPO, IMPLEMENTATION_REPO>
        where INTERFACE_REPO : class
        where IMPLEMENTATION_REPO : INTERFACE_REPO, new()
    {
        protected TedContext _db;

        protected INTERFACE_REPO _repository;

        [TestInitialize]

        public void TestInitialize()
        {
            var optionsBuilder = new DbContextOptionsBuilder<TedContext>();
            // $"Data Source=.;Initial Catalog=TedIntegrationTests_{Guid.NewGuid().ToString("N")};Integrated Security=False;User ID=nunit;Password=test;Pooling=True;TrustServerCertificate=True;Authentication=\"Sql Password\""
            optionsBuilder.UseSqlServer($"Data Source =.; Initial Catalog=TedIntegrationTests;Integrated Security=True;");
            _db = new TedContext(optionsBuilder.Options);
            
            
            //_db.Database.EnsureDeleted();
            //_db.Database.EnsureCreated();
            
        }


        [TestCleanup]
        public void TestCleanup()
        {
            if (_db != null)
            {
                //KillConnectionsToTheDatabase(_db.Database);
                //_db.Database.Delete();
            }
        }

        protected static void KillConnectionsToTheDatabase(Database database)
        {
            //var databaseName = database.Connection.Database;
            //const string sqlFormat = @"
            // USE master; 

            // DECLARE @databaseName VARCHAR(50);
            // SET @databaseName = '{0}';

            // declare @kill varchar(8000) = '';
            // select @kill=@kill+'kill '+convert(varchar(5),spid)+';'
            // from master..sysprocesses 
            // where dbid=db_id(@databaseName);

            // exec (@kill);";

            //var sql = string.Format(sqlFormat, databaseName);
            //using (var command = database.Connection.CreateCommand())
            //{
            //    command.CommandText = sql;
            //    command.CommandType = CommandType.Text;


            //    try
            //    {
            //        command.Connection.Open();
            //        command.ExecuteNonQuery();
            //        command.Connection.Close();
            //    }
            //    catch (System.Exception)
            //    {
            //        // Fail silently if database does not exist
            //    }

            //}
        }
    }
}
