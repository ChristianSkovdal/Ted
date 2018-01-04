using System;
using System.Collections.Generic;
using System.IO;
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

        //public Workspace GetOneWorkspace(int workspaceId)
        //{
        //    return _db.Workspaces.SingleOrDefault(r => r.id == workspaceId && !r.deleted);
        //}

        public IEnumerable<Workspace> GetAllWorkspacesForUser(User user)
        {
            var ids = new List<int>();
            if (!string.IsNullOrEmpty(user.workspaceList))
            {
                ids = user.workspaceList.Split(',').Select(r => int.Parse(r)).ToList();
            }
            var workspaces = _db.Workspaces
                .Where(r => ids.Contains((int)r.id) && !r.deleted)
                .Concat(_db.Workspaces.Where(r => r.UserId == user.id && !r.deleted));
                //.Select(r => new WorkspaceDTO(r));

            //_db.Workspaces.Where(r => r.UserId == user.id).ToList();
            return workspaces.OrderByDescending(r => r.id).ToList();
        }

        public ICollection<Page> GetNavigationTree(int workspaceId)
        {
            var pages = _db.Pages.Where(r => r.WorkspaceId==workspaceId && !r.deleted).ToList();

            RecursePageTree(pages);

            return pages;
        }

        private void RecursePageTree(ICollection<Page> pages)
        {
            pages.ToList();
            foreach (var p in pages)
            {
                p.routeId = "page:" + p.id;
                RecursePageTree(p.pages);
            }
        }

        public Page GetPage(int id)
		{
			var page = _db.Pages.SingleOrDefault(r => r.id==id && !r.deleted);
            page.workspace = _db.Workspaces.SingleOrDefault(r => r.id == page.WorkspaceId);

            return page;
		}

        public Page AddPage(Page page, int workspaceId, User user)
        {
            var ws = _db.Workspaces.SingleOrDefault(r => r.id==workspaceId && !r.deleted);

            page.createdBy = user.id;
            page.createdTime = DateTime.Now;

            var json = File.ReadAllText(Path.Combine("templates", "page_template.json"));
            page.json = json.Replace("{{PAGE_NAME}}", page.text);

            ws.pages.Add(page);
            _db.SaveChanges();
            return page;
        }

        public Workspace CreateWorkspace(Workspace workspace, User user)
        {
            workspace.createdBy = user.id;
            workspace.createdTime = DateTime.Now;

			var cmp = new Page
			{
				createdBy = user.id,
				createdTime = DateTime.Now,
				json = File.ReadAllText(Path.Combine("templates", "welcome_template.json")),
                text = "Welcome",
                iconCls = "x-fa fa-home"
            };

            workspace.pages.Add(cmp);

            user.myWorkspaces.Add(workspace);
            _db.Add(workspace);
            _db.SaveChanges();

            //var tpl = File.ReadAllText(Path.Combine("templates", "tree_template.json"));
            //value.componentTree = tpl.Replace("{{PAGEID}}", cmp.id.ToString());
            workspace.startPageId = cmp.id;


            _db.SaveChanges();

            return workspace;
        }

        public void DeleteWorkspace(int id)
        {
            var ws = _db.Workspaces.SingleOrDefault(u => u.id == id);
            if (ws == null)
                throw new Exception($"Workspace with Id {id} not found");

            ws.modifiedTime = DateTime.Now;
            ws.deleted = true;

            foreach (var page in _db.Pages.Where(p => p.WorkspaceId==ws.id))
            {
                page.deleted = true;
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

        
    }
}
