using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Ted.Server.Interfaces;

namespace Ted.Server.Data.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(TedContext context, IConfiguration configuration)
            : base(context, configuration)
        {

        }

    }
}
