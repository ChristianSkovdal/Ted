using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Ted.Server.Data.Repositories
{
    public class WorkspaceRepository : BaseRepository
    {
        public WorkspaceRepository(TedContext context, IConfiguration configuration)
            : base(context, configuration)
        {
            
        }
    }
}
