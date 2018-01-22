using System.Collections.Generic;

namespace Ted.Server.DTO
{
    public class PageUpdate
    {

        public string json { get; set; }

        public ColumnDefinition column { get; set; }

        public string dataSourceId { get; set; }

        //public string masterPageId { get; set; }

    }
}
