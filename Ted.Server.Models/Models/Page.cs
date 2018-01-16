using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ted.Server.Models
{
    public class Page : BaseEntity
    {
        public string text { get; set; }

        public string iconCls { get; set; }

        public string json { get; set; }

		public int WorkspaceId { get; set; }


        public bool isPublic { get; set; }
        //public int PageId { get; set; }

        public virtual ICollection<Page> pages { get; set; } = new List<Page>();

        [NotMapped]
        public Workspace workspace { get; set; }

        [NotMapped]
        public string routeId { get; set; }
    }
}
