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
        public int Id { get; set; }

        public int ModifiedBy { get; set; }

        public int CreatedBy { get; set; }

        public DateTime ModifiedTime { get; set; }

        public DateTime CreatedTime { get; set; }

        public bool Deleted { get; set; }
    }
}
