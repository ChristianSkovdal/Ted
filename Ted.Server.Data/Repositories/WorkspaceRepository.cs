using Microsoft.Extensions.Configuration;

namespace Ted.Server.Data
{
    public class WorkspaceRepository : BaseDataRepository
    {
        public WorkspaceRepository(TedContext context, IConfiguration configuration)
            : base(context, configuration)
        {
            
        }
    }
}
