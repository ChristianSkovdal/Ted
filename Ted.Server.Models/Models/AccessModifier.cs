using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ted.Server.Models
{
    public class AccessModifier
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id { get; set; }

        public string reference { get; set; }

        public Group group { get; set; }

        public bool isReadOnly { get; set; }

        public bool isProtected { get; set; }

        public bool isHidden { get; set; }
    }
}
