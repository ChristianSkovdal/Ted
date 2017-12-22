using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ted.Server.Data
{
    public class BaseDataRepository
    {
        protected readonly TedContext _db;
        protected readonly ILogger _logger;
        protected readonly IConfiguration _config;

        public BaseDataRepository(TedContext context, IConfiguration configuration, ILogger<BaseDataRepository> logger)
        {
            _db = context;
            _logger = logger;
            _config = configuration;
        }
        public BaseDataRepository(TedContext context, IConfiguration configuration)
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
