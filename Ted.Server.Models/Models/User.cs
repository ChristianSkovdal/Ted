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

        //public virtual ICollection<UsersInGroups> usersInGroups { get; } = new List<UsersInGroups>();

        // Workspaces created by me
        public virtual ICollection<Workspace> myWorkspaces { get; } = new List<Workspace>();

        // List of workspaces I use
        public string workspaceList { get; set; }

    }
}
