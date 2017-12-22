using System;

namespace Ted.Server.Exceptions
{
    public class TedExeption : Exception
    {
        public ExceptionCodes Code { get; private set; }

        public TedExeption(ExceptionCodes code, string message) 
            : base(message) { Code = code; }

        public TedExeption(ExceptionCodes code) 
            : base($"Exception with code '{code.ToString()}' was thrown") { Code = code; }

        public TedExeption(ExceptionCodes code, string message, Exception innerException) 
            : base(message, innerException) { Code = code; }

    }
}
