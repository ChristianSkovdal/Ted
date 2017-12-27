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

        public WorkspaceDTO GetOne(int workspaceId)
        {
            return _db.Workspaces.Select(r => new WorkspaceDTO(r))
            .SingleOrDefault(r => r.id == workspaceId && !r.deleted);
        }

        public IEnumerable<WorkspaceDTO> GetAllForUser(User user)
        {
            var ids = user.workspaceList.Split(',').Select(r => int.Parse(r));
            var workspaces = _db.Workspaces
                .Select(r => new WorkspaceDTO(r))
                .Where(r => ids.Contains(r.id) && !r.deleted)
                .Concat(user.myWorkspaces.Select(r => new WorkspaceDTO(r)));
            return workspaces.ToList();
        }

        public int Create(Workspace value, User user)
        {
            value.createdBy = user;
            value.modifiedBy = user;
            value.createdTime = DateTime.Now;
            value.componentTree = "{}";

            user.myWorkspaces.Add(value);
            _db.Add(value);
            _db.SaveChanges();
            return value.id;
        }

        public void Delete(int id)
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

        public void Update(int id, JObject data, User user)
        {
            var ws = GetOne(id);

            Update(ws, data);

            ws.modifiedTime = DateTime.Now;
            ws.modifiedBy = user;

            _db.SaveChanges();
        }
    }
}
