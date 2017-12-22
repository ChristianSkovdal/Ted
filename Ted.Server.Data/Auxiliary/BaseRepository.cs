using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using Ted.Server.Exceptions;

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

        protected void Update(object obj, JObject data)
        {
            foreach (var prop in data)
            {
                string propName = prop.Key;
                JToken propValue = prop.Value;

                PropertyInfo propInfo = obj.GetType().GetProperty(propName);
                if (propInfo == null)
                    throw new TedExeption(ExceptionCodes.Generic, $"Cannot get property {propName} for entity");
                var value = Convert.ChangeType(propValue.ToString(), propInfo.PropertyType);
                propInfo.SetValue(obj, value);
            }
        }
    }
}
