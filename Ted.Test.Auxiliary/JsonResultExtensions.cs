using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ted.Test.Auxiliary
{
    public static class JsonResultExtensions
    {
        public static T Get<T>(this JsonResult result, string path)
        {
            var retval = result.Value;
            var tokens = path.Split(".");
            for (int i = 0; i < tokens.Length; i++)
            {
                string token = tokens[i];
                var prop = retval.GetType().GetProperty(token);
                if (prop!=null)
                {
                    var temp = prop.GetValue(retval, null);
                    if (i == tokens.Length - 1)
                    {
                        return (T)temp;
                    }
                    else
                    {
                        retval = temp;
                    }
                }
            }
            return default(T);
        }
    }
}
