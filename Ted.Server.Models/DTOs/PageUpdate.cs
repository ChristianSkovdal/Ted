using System.Collections.Generic;

namespace Ted.Server.Models
{
    public class PageUpdate
    {

        public string json { get; set; }

        public ColumnDefinition column { get; set; }

        public string dataSourceId { get; set; }

    }
}
