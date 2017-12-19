using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ted.Server.Data.Repositories
{
    public class BaseRepository
    {
        protected readonly TedContext _db;
        protected readonly ILogger _logger;
        protected readonly IConfiguration _config;

        public BaseRepository(TedContext context, IConfiguration configuration, ILogger<BaseRepository> logger)
        {
            _db = context;
            _logger = logger;
            _config = configuration;
        }
        public BaseRepository(TedContext context, IConfiguration configuration)
            : this(context, configuration,null)
        {
        }

        public void Dispose()
        {
            if (_db != null)
                _db.Dispose();
        }
    }
}
