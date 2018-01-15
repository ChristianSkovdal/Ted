using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ted.Server.Exceptions
{
    public enum ExceptionCodes : int
    {
        Generic = 0,

        Authentication = 100,
        NotSuperUser=101,
        UserExist = 102,
		PageNotFound = 103,
        TableNotFound = 104,
        ColumnExist = 105
    }
}
