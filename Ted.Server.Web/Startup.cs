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
using Ted.Auxiliary.Logging;

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
            //loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            //loggerFactory.AddDebug();
            //loggerFactory.AddContext(LogLevel.Information, Configuration.GetConnectionString("Logging"));

            //services.AddSingleton(new LoggerFactory()
            //    .AddConsole()
            //    .AddDebug());
            //services.AddLogging();

            services.AddTransient<IConfigRepository, ConfigRepository>();
            services.AddSingleton<IConfiguration>(this.Configuration);
            //services.AddSingleton<ILogger, DBLogger>();

            services.AddMvc();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Ted API", Version = "v1" });
            });

            services.AddDbContext<TedContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            //services.AddDbContext<LoggingDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Logging")));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddProvider(new DatabaseLoggerProvider(Configuration.GetConnectionString("Logging")));

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
