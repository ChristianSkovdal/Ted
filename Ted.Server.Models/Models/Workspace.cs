using System;
using System.Collections.Generic;
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

        public virtual ICollection<Group> groups { get; } = new List<Group>();

        public virtual ICollection<AccessModifier> access { get; } = new List<AccessModifier>();

        public virtual ICollection<ComponentModifier> modifiers { get; } = new List<ComponentModifier>();

    }
}
