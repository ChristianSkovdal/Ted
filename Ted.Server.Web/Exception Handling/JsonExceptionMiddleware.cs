using Microsoft.ApplicationInsights.Extensibility.Implementation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Ted.Server.Web
{
    public class JsonExceptionMiddleware
    {
        public async Task Invoke(HttpContext context)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var ex = context.Features.Get<IExceptionHandlerFeature>()?.Error;
            if (ex == null)
                return;

            var tedException = ex as TedExeption;

            var error = new
            {
                success = false,
                message = ex.Message,
                error = tedException != null ? tedException.Code : 0
            };

            context.Response.ContentType = "application/json";

            using (var writer = new StreamWriter(context.Response.Body))
            {
                await context.Response.WriteAsync(JsonConvert.SerializeObject(error));
                await writer.FlushAsync().ConfigureAwait(false);
            }
        }
    }
}
