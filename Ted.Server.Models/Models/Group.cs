using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ted.Server.Models
{
    public class Group : BaseEntity
    {
        public string name { get; set; }

        public string description { get; set; }

        public virtual ICollection<UsersInGroups> usersInGroups { get; } = new List<UsersInGroups>();
    }
}
