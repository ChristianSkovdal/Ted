using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ted.Server.Models
{
    public class Workspace : BaseEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string ComponentTree { get; set; }

        public string EventHandlers { get; set; }

        public string SecurityGroups { get; set; }

        public string ComponentModifiers { get; set; }

    }
}
