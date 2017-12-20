using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Ted.Server.Data.Auxiliary;

namespace Ted.Server.Data.Repositories
{
    public class WorkspaceRepository : BaseDataRepository
    {
        public WorkspaceRepository(TedContext context, IConfiguration configuration)
            : base(context, configuration)
        {
            
        }
    }
}
