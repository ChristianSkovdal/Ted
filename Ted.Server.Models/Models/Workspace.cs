using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ted.Server.Models
{
    public class Workspace : BaseEntity
    {

        public Workspace()
        {
        }

        //public Workspace(WorkspaceDTO workspace)
        //{
        //    id = workspace.id;
        //    createdBy = workspace.createdBy;
        //    createdTime = workspace.createdTime;
        //    modifiedBy = workspace.modifiedBy;
        //    description = workspace.description;
        //    modifiedTime = workspace.modifiedTime;
        //    name = workspace.name;
        //}

        public string name { get; set; }

        public string description { get; set; }

        //public string componentTree { get; set; }

        public int startPageId { get; set; }

        //public string eventHandlers { get; set; }

        //public virtual ICollection<Group> groups { get; } = new List<Group>();

        //public virtual ICollection<AccessModifier> access { get; } = new List<AccessModifier>();

        //public virtual ICollection<ComponentModifier> modifiers { get; } = new List<ComponentModifier>();

        public virtual ICollection<Page> pages { get; set; } = new List<Page>();

        public int UserId { get; set; }

        //public ICollection<TreeNode> nodes { get; set; } = new List<TreeNode>();

    }
}
