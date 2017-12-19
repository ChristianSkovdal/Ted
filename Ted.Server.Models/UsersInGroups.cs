using System.Collections.Generic;

namespace Ted.Server.Models
{
    public class UsersInGroups
    {
        public int UserId { get; set; }

        public User User { get; set; }

        public int GroupId { get; set; }

        public Group Group { get; set; }
    }
}