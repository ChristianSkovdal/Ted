using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ted.Server.Web
{
    public class TedExeption : Exception
    {
        public ExceptionCodes Code { get; private set; }

        public TedExeption(ExceptionCodes code, string message) : base(message) { Code = code; }

        public TedExeption(ExceptionCodes code) : base(null) { Code = code; }

        public TedExeption(ExceptionCodes code, string message, Exception innerException) : base(message, innerException) { Code = code; }

    }
}
