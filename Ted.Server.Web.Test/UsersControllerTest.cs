
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json.Linq;
using Ted.Server.Data;
using Ted.Server.Data.Repositories;
using Ted.Server.Interfaces;
using Ted.Server.Models;
using Ted.Server.Web.Controllers;
using Ted.Test.Auxiliary;

namespace Ted.Server.Web.Test
{
    [TestClass]
    public class UsersControllerTest : TestBase<IUserRepository, UserRepository>
    {
        public UsersControllerTest()
        {

        }

        const string superToken = "123";

        [TestInitialize]

        public void ConfigureUsers()
        {
           // Create a superuser
            _db.Users.Add(new User
            {
                Token = superToken,
                IsSuperUser=true
            });
            _db.SaveChanges();
        }

        [TestMethod]
        public void UserController_CreateUpdateDeleteUser()
        {
            // Arrange

            string userToken = "";

            var repo = new UserRepository(_db, null);
            var auth = new AuthenticationHandler(_db, null, null);
            var controller = new UsersController(repo, auth);

            // Act
            var result = controller.Post(new User
            {
                FullName = "Test User",
                Password = "xyz",
                Email = "testuser@gmail.com"
            });

            //JObject jObject = JObject.Parse();
            //JToken jUser = jObject["user"];

        }
    }
}
