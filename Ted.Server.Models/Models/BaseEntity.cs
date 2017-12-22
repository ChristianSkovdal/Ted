using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Ted.Server.Models
{
    public class BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id { get; set; }

        public int modifiedBy { get; set; }

        public int createdBy { get; set; }

        public DateTime modifiedTime { get; set; }

        public DateTime createdTime { get; set; }

        public bool deleted { get; set; }
    }
}
