using System.Collections.Generic;

namespace Ted.Server.Models
{
    public class User : BaseEntity
    {

        public string fullName { get; set; }

        public string email { get; set; }

        public string password { get; set; }

        public bool isSuperUser { get; set; } = false;

        public string token { get; set; }

        public virtual ICollection<UsersInGroups> usersInGroups { get; } = new List<UsersInGroups>();

        public virtual ICollection<Workspace> myWorkspaces { get; } = new List<Workspace>();

        public string workspaceList { get; set; }

    }
}
