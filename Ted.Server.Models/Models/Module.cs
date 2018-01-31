
using System;
using System.Collections.Generic;
using System.Text;

namespace Ted.Server.Models
{
    public class Module : BaseEntity
    {
        public string name { get; set; }

        public string sourceCode { get; set; }

        public int workspaceId { get; set; }
    }
}
