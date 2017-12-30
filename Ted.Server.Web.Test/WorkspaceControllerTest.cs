using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using Ted.Server.Data;
using Ted.Server.Interfaces;
using Ted.Server.Models;
using Ted.Server.Web.Controllers;
using Ted.Test.Auxiliary;

namespace Ted.Server.Web.Test
{
    [TestClass]
    public class WorkspaceControllerTest : TestBase<WorkspaceRepository>
    {
        WorkspaceController _wsCtl;
        UserController _userCtl;
        User _user;
        string _token;

        [TestInitialize]

        public void Init()
        {
            var wsrepo = new WorkspaceRepository(_db, null);
            var userrepo = new UserRepository(_db, null);
            var auth = new AuthenticationHandler(_db, null, null);

            _wsCtl = new WorkspaceController(wsrepo, auth);
            _userCtl = new UserController(userrepo, auth);


            // Setup user
            var u = new User
            {
                fullName = "Workspace Test User",
                password = "xyz",
                email = Guid.NewGuid().ToString("N") + "@gmail.com"
            };

            _userCtl.Post(u);

            // Now make the real login
            var result = _userCtl.Login(new Login
            {
                email = u.email,
                password = u.password
            });

            Assert.IsTrue(result.Get<bool>("success"));

            _user = result.Get<User>("data");
            Assert.IsNotNull(_user);

            _token = _user.token;
        }

        [TestCleanup]
        public void Cleanup()
        {
            _userCtl.Delete(_token, (int)_user.id);
        }


        [TestMethod]
        public void WorkspaceController_GetUserWorkspaces()
        {
            // Arrange

            var wsids = new List<int>();

            var anotherUser = new User
            {
                fullName = "Another User",
                email = Guid.NewGuid().ToString("N"),
                password = "xyz"
            };
            _userCtl.Post(anotherUser);

            var anotherToken = _userCtl.Login(new Login()
            {
                email = anotherUser.email,
                password = anotherUser.password
            }).Get<string>("data.token");

            for (int i = 0; i < 10; i++)
            {
                wsids.Add(_wsCtl.AddWorkspace(anotherToken, new WorkspaceDTO
                {
                    name = "Test Workspace #" + i
                }).Get<int>("data"));
            }

            Assert.AreEqual(10, anotherUser.myWorkspaces.Count);

            _wsCtl.AddWorkspace(_token, new WorkspaceDTO { name = "MyWorkspace" });

            Assert.AreEqual(1, _user.myWorkspaces.Count());

            _user.workspaceList = string.Join(',',wsids.Select(r => r.ToString()));
            var wsForUser = _wsCtl.GetAllForUser(_user.token);
            Assert.AreEqual(11, wsForUser.Get<IEnumerable<WorkspaceDTO>>("data").Count());

            _wsCtl.DeleteWorkspace(anotherToken, wsids.First());

            var wsForUserAfterDelete = _wsCtl.GetAllForUser(_user.token);
            Assert.AreEqual(11, wsForUser.Get<IEnumerable<WorkspaceDTO>>("data").Count());

        }



        [TestMethod]
        public void WorkspaceController_CreateUpdateDeleteWorkspace()
        {
            // Arrange

            var ws = new WorkspaceDTO
            {
                name = "Test Workspace",
            };

            // Act
            var result = _wsCtl.AddWorkspace(_token, ws);

            // Assert
            Assert.IsTrue(result.Get<bool>("success"));
            int wsid = result.Get<int>("data");
            Assert.IsTrue(wsid > 0);

            // Act
            _wsCtl.UpdateWorkspace(_token, wsid, JObject.Parse("{description:'abc'}"));
            result = _wsCtl.GetOne(_token, wsid);

            // Assert
            Assert.AreEqual("abc", result.Get<string>("data.description"));

            // Act
            _wsCtl.DeleteWorkspace(_token, wsid);

            // Assert
            Assert.IsNull(_wsCtl.GetOne(_token, wsid).Get<WorkspaceDTO>("data"));
        }




    }
}
