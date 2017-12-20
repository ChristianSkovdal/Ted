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
using Ted.Server.Data.Auxiliary;

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
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IAuthenticationHandler, AuthenticationHandler>();
            services.AddSingleton<IConfiguration>(this.Configuration);

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

            // Static files
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ted API V1");
            });

            app.UseMvc();
        }
    }
}
