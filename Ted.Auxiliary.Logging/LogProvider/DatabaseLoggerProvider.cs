using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;

namespace Ted.Auxiliary.Logging
{
    public class DatabaseLoggerProvider : ILoggerProvider
    {
        string _connStr;
        public DatabaseLoggerProvider(string connStr)
        {
            _connStr = connStr;
        }

        public ILogger CreateLogger(string categoryName)
        {
            return new DatabaseLogger(_connStr);
        }

        public void Dispose()
        {
            
        }
    }
}