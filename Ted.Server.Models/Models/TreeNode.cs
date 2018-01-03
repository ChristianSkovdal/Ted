
using System;
using System.Collections.Generic;
using System.Text;

namespace Ted.Server.Models
{
    public class TreeNode : BaseEntity
    {
        public string text { get; set; }

        public virtual ICollection<TreeNode> children { get; set; } = new List<TreeNode>();
    }
}
