using System.Collections.Generic;

namespace Ted.Server.Models
{
    public class User : BaseEntity
    {

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public bool IsSuperUser { get; set; } = false;

        public string Token { get; set; }

        public virtual ICollection<UsersInGroups> UsersInGroups { get; } = new List<UsersInGroups>();

        public virtual ICollection<Workspace> MyWorkspaces { get; } = new List<Workspace>();

        public string WorkspaceList { get; set; }

    }
}
