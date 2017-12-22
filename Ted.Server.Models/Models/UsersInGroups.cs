using System.Collections.Generic;

namespace Ted.Server.Models
{
    public class UsersInGroups
    {
        public int userId { get; set; }

        public User user { get; set; }

        public int groupId { get; set; }

        public Group group { get; set; }
    }
}