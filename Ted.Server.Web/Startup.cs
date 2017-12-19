using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;
using Ted.Server.Data;
using Ted.Server.Data.Repositories;
using Ted.Server.Interfaces;
//using Ted.Util.Logging;

namespace Ted.Server.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IConfigRepository, ConfigRepository>();
            services.AddSingleton<IConfiguration>(this.Configuration);

            services.AddMvc();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Ted API", Version = "v1" });
            });

            //CustomLoggerDBContext.ConnectionString = Configuration.GetConnectionString("Logging");
            //services.AddDbContext<CustomLoggerDBContext>();

            var connection = @"Server=A75105;Database=EFGetStarted;Trusted_Connection=True;ConnectRetryCount=0";
            services.AddDbContext<TedContext>(options => options.UseSqlServer(connection));


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            //loggerFactory.AddContext(LogLevel.Information, Configuration.GetConnectionString("Logging"));

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseExceptionHandler(new ExceptionHandlerOptions
            {
                ExceptionHandler = new JsonExceptionMiddleware().Invoke
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ted API V1");
            });

            app.UseMvc();
        }
    }
}
