using System;
using System.Collections.Generic;

namespace Ted.Util.Logging
{
    public partial class EventLog
    {
        public int Id { get; set; }

        public int? EventId { get; set; }

        public string LogLevel { get; set; }

        public string Message { get; set; }

        public DateTime? CreatedTime { get; set; }

    }
}
