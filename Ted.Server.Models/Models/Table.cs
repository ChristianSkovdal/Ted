using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ted.Server.Models
{
    public class Table : BaseEntity
    {
        public string name { get; set; }

        public bool isPublic { get; set; }

        public virtual ICollection<User> users { get; set; } = new List<User>();


    }
}
