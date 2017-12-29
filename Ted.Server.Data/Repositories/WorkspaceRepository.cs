using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Ted.Server.Models;

namespace Ted.Server.Data
{
    public class WorkspaceRepository : BaseDataRepository
    {

        public WorkspaceRepository()
            : base(null, null, null)
        {

        }

        public WorkspaceRepository(TedContext context, IConfiguration configuration)
            : base(context, configuration)
        {

        }

        public WorkspaceDTO GetOneWorkspace(int workspaceId)
        {
            var ws = _db.Workspaces.SingleOrDefault(r => r.id == workspaceId && !r.deleted);
            return ws == null ? null : new WorkspaceDTO(ws);
        }

        public IEnumerable<WorkspaceDTO> GetAllWorkspacesForUser(User user)
        {
            var ids = new List<int>();
            if (!string.IsNullOrEmpty(user.workspaceList))
            {
                ids = user.workspaceList.Split(',').Select(r => int.Parse(r)).ToList();
            }
            var workspaces = _db.Workspaces
                .Select(r => new WorkspaceDTO(r))
                .Where(r => ids.Contains(r.id) && !r.deleted)
                .Concat(user.myWorkspaces.Select(r => new WorkspaceDTO(r)));
            return workspaces.ToList();
        }

        public int CreateWorkspace(Workspace value, User user)
        {
            value.createdBy = user.id;
            value.modifiedBy = user.id;
            value.createdTime = DateTime.Now;
            //value.componentTree = "{}";

            user.myWorkspaces.Add(value);
            _db.Add(value);
            _db.SaveChanges();
            return value.id;
        }

        public void DeleteWorkspace(int id)
        {
            var ws = _db.Workspaces.SingleOrDefault(u => u.id == id);
            if (ws == null)
                throw new Exception($"Workspace with Id {id} not found");

            ws.modifiedTime = DateTime.Now;
            ws.deleted = true;

            foreach (var g in ws.groups)
            {
                g.usersInGroups.Clear();
                g.deleted = true;
            }

            _db.SaveChanges();
        }

        public void UpdateWorkspace(int id, JObject data, User user)
        {
            var ws = _db.Workspaces.SingleOrDefault(u => u.id == id);

            Update(ws, data);

            ws.modifiedTime = DateTime.Now;
            ws.modifiedBy = user.id;

            _db.SaveChanges();
        }


        public void DeleteComponent(int workspaceId, string componentId)
        {
            throw new NotImplementedException();
        }

        public string GetComponentTree(int workspaceId)
        {
            var ws = _db.Workspaces.SingleOrDefault(u => u.id == workspaceId);
            return ws.componentTree;
        }

        public void InsertComponent(Component value, int workspaceId, int position, User user)
        {
            throw new NotImplementedException();
        }
    }
}
