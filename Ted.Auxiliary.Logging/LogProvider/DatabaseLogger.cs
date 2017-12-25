using System;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ted.Auxiliary.Logging
{
    internal class DatabaseLogger : ILogger
    {
        private LoggingDbContext _db;
        private readonly string _connStr;

        public DatabaseLogger(string connStr)
        {
            _connStr = connStr;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            if (formatter == null)
            {
                throw new ArgumentNullException(nameof(formatter));
            }
            var message = formatter(state, exception);
            Debug.WriteLine(message);

            if (_db == null)
            {
                var optionsBuilder = new DbContextOptionsBuilder<LoggingDbContext>();
                optionsBuilder.UseSqlServer(_connStr);
                _db = new LoggingDbContext(optionsBuilder.Options);
            }
            _db.EventLog.Add(new LogEvent
            {
                Message = message,
                EventId = eventId.Id,
                LogLevel = (int)logLevel,
                CreatedTime = DateTime.UtcNow
            });
            //_db.SaveChanges();
        }
    }
}