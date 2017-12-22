using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ted.Server.Models
{
    public class Workspace : BaseEntity
    {
        public string name { get; set; }

        public string description { get; set; }

        public string componentTree { get; set; }

        public string eventHandlers { get; set; }

        public string securityGroups { get; set; }

        public string componentModifiers { get; set; }

    }
}
