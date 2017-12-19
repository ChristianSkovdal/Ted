
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ted.Util.Logging
{
    public class DBLogger : ILogger
    {
        private string _categoryName;
        private string _connStr;
        private Func<string, LogLevel, bool> _filter;
        private int MessageMaxLength = 4000;
        CustomLoggerDBContext _db;

        public DBLogger(string categoryName, Func<string, LogLevel, bool> filter, string connectionString)
        {
            _categoryName = categoryName;
            _filter = filter;
            _connStr = connectionString;
            //_db = new CustomLoggerDBContext(connectionString);
            //_helper = new SqlHelper(connectionString);
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            if (!IsEnabled(logLevel))
            {
                return;
            }
            if (formatter == null)
            {
                throw new ArgumentNullException(nameof(formatter));
            }
            var message = formatter(state, exception);
            if (string.IsNullOrEmpty(message))
            {
                return;
            }

            if (exception != null)
            {
                message += "\n" + exception.ToString();
            }
            message = message.Length > MessageMaxLength ? message.Substring(0, MessageMaxLength) : message;

            if (_db == null)
            {
                var optionsBuilder = new DbContextOptionsBuilder<CustomLoggerDBContext>();
                optionsBuilder.UseSqlServer(_connStr);
                _db = new CustomLoggerDBContext(optionsBuilder.Options);

            }

            _db.EventLog.Add(new EventLog
            {
                Message = message,
                EventId = eventId.Id,
                LogLevel = logLevel.ToString(),
                CreatedTime = DateTime.UtcNow
            });
            //_db.SaveChangesAsync();
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return (_filter == null || _filter(_categoryName, logLevel));
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }
    }

}
