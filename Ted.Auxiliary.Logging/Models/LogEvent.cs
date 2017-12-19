using System;

namespace Ted.Auxiliary.Logging
{
    public class LogEvent
    {
        public int Id { get; set; }

        public int? EventId { get; set; }

        public int LogLevel { get; set; }

        public string Message { get; set; }

        public DateTime? CreatedTime { get; set; }
    }
}