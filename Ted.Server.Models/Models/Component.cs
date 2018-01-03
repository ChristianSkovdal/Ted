using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ted.Server.Models
{
    public class Component : BaseEntity
    {
        public string json { get; set; }

		public int WorkspaceId { get; set; }
	}
}
