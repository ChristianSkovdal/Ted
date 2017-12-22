using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Diagnostics;
using Ted.Server.Data;
using Ted.Server.Interfaces;
using Ted.Server.Models;
using Ted.Server.Web.Controllers;
using Ted.Test.Auxiliary;

namespace Ted.Server.Web.Test
{
    [TestClass]
    public class UsersControllerTest : TestBase<UserRepository>
    {
        public UsersControllerTest()
        {

        }

        const string superToken = "123";
        
        [TestInitialize]

        public void ConfigureUsers()
        {
            // Create a superuser
            //_db.Users.Add(new User
            //{
            //    Token = superToken,
            //    IsSuperUser=true
            //});
            //_db.SaveChanges();

            Mock<ILogger<BaseDataRepository>> mockLogger = new Mock<ILogger<BaseDataRepository>>();
            //mockLogger.Setup(m => m.LogInformation() );

            var repo = new ConfigRepository(_db, null, mockLogger.Object);
            new ConfigController(repo).Seed(Guid.NewGuid().ToString("N") + "@gmail.com");
        }

        [TestMethod]
        public void UserController_CreateLoginUpdateDeleteUser()
        {
            // Arrange
            var repo = new UserRepository(_db, null);
            var auth = new AuthenticationHandler(_db, null, null);
            var controller = new UserController(repo, auth);
            var u = new User
            {
                fullName = "Test User",
                password = "xyz",
                email = Guid.NewGuid().ToString("N") + "@gmail.com"
            };

            // Act
            var result = controller.Post(u);

            // Assert
            Assert.IsTrue(result.Get<bool>("success"));
            Assert.IsTrue(result.Get<int>("data.id")>0);

            // Make a failed login
            result = controller.Login(new Login
            {
                Email = u.email,
                Password = "WRONG_PASSWORD"
            });

            Assert.IsFalse(result.Get<bool>("success"));

            // Now make the real login
            result = controller.Login(new Login
            {
                Email = u.email,
                Password = u.password
            });

            Assert.IsTrue(result.Get<bool>("success"));

            var verifiedUser = result.Get<User>("data");
            Assert.IsNotNull(verifiedUser);
            string token = verifiedUser.token;
            Assert.IsNotNull(token);

            // Change the password
            u.password = "abc";

            var jsonObj = JObject.Parse("{password:'123'}");
            controller.Put(token, u.id, jsonObj);

            // Get it
            result = controller.Get(token, verifiedUser.id);
            Assert.AreEqual("123", result.Get<string>("data.password"));

            // Delete it
            controller.Delete(token, verifiedUser.id);

            result = controller.Get(token, verifiedUser.id);
            Assert.IsNull(result.Get<User>("data"));
        }


    }
}
