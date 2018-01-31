using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Ted.Server.DTO;
using Ted.Server.Exceptions;
using Ted.Server.Models;

namespace Ted.Server.Data
{
    public class ModuleRepository : BaseDataRepository
    {

        public ModuleRepository()
            : base(null, null, null)
        {

        }

        public ModuleRepository(TedContext context, IConfiguration configuration)
            : base(context, configuration)
        {

        }

        public IEnumerable<Module> GetAllForWorkspace(int workspaceId)
        {
            return GetAll().Where(r => r.workspaceId==workspaceId);
        }

        public IEnumerable<Module> GetAll()
        {
            return _db.Modules.Where(r => !r.deleted).OrderByDescending(r => r.id);
        }

        public Module GetModule(int id)
        {
            //var page = _db.Pages.SingleOrDefault(r => r.id == id && !r.deleted);
            //if (page == null)
            //    throw new Exception($"The page with id {id} does not exist");
            //page.workspace = _db.Workspaces.SingleOrDefault(r => r.id == page.WorkspaceId);

            //return page;

            throw new NotImplementedException();
        }

        public void UpdateModule(int moduleId, Module update)
        {
            //var page = _db.Pages.SingleOrDefault(r => r.id == pageId && !r.deleted);
            //if (page == null)
            //    throw new Exception($"The page with id {pageId} does not exist");

            //// Always set the child components JSON
            //page.json = update.json.Replace("\\r", "");

            //// This is a column update so create the column
            //if (update.column != null)
            //{
            //    if (update.dataSourceId == null)
            //        throw new Exception("DatasourceId is missing from the update");
            //    using (var tbl = new FlexTable(_config.GetConnectionString("DefaultConnection"), update.dataSourceId))
            //    {
            //        tbl.CreateColumn(update.column.name, update.column.type, true);
            //    }
            //}

            //_db.SaveChanges();
            throw new NotImplementedException();

        }

        public object GetAllForUser(User user)
        {
            return GetAll().Where(m => m.createdBy == user.id);
        }

        public Module AddModule(Module module, int workspaceId, User user)
        {
            var ws = _db.Workspaces.SingleOrDefault(r => r.id == workspaceId && !r.deleted);

            module.createdBy = user.id;
            module.createdTime = DateTime.Now;

            ws.modules.Add(module);

            _db.SaveChanges();
            return module;
        }

        public Module AddModule(Module module, User user)
        {
            //workspace.createdBy = user.id;
            //workspace.createdTime = DateTime.Now;

            //var cmp = new Page
            //{
            //    createdBy = user.id,
            //    createdTime = DateTime.Now,
            //    json = File.ReadAllText(Path.Combine("templates", "welcome_template.json")),
            //    text = "Welcome",
            //    iconCls = "x-fa fa-home"
            //};

            //workspace.pages.Add(cmp);

            //user.myWorkspaces.Add(workspace);
            //_db.Add(workspace);
            //_db.SaveChanges();

            ////var tpl = File.ReadAllText(Path.Combine("templates", "tree_template.json"));
            ////value.componentTree = tpl.Replace("{{PAGEID}}", cmp.id.ToString());
            //workspace.startPageId = cmp.id;


            //_db.SaveChanges();

            //return workspace;
            throw new NotImplementedException();
        }

        public void DeleteModule(int id, User user)
        {
            var module = _db.Modules.SingleOrDefault(u => u.id == id);
            if (module == null)
                throw new Exception($"Module with Id {id} not found");
            if (module.createdBy != user.id)
                throw new TedExeption(ExceptionCodes.Authentication);


            module.modifiedTime = DateTime.Now;
            module.deleted = true;

            _db.SaveChanges();            
        }

        public void UpdateModule(int id, JObject data, User user)
        {
            var module = _db.Modules.SingleOrDefault(u => u.id == id);
            if (module == null)
                throw new Exception($"Module with Id {id} not found");
            if (module.createdBy!=user.id)
                throw new TedExeption(ExceptionCodes.Authentication);

            Update(module, data);

            module.modifiedTime = DateTime.Now;
            module.modifiedBy = user.id;

            _db.SaveChanges();
        }


    }
}
