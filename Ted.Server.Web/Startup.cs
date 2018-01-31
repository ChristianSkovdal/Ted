using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;
using Ted.Server.Data;
using Ted.Server.Interfaces;
using Ted.Auxiliary.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using Microsoft.AspNetCore.Localization;
using System.Globalization;

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

            services.AddTransient<DataRepository, DataRepository>();
            services.AddTransient<ConfigRepository, ConfigRepository>();
            services.AddTransient<UserRepository, UserRepository>();
            services.AddTransient<WorkspaceRepository, WorkspaceRepository>();
            services.AddTransient<ModuleRepository, ModuleRepository>();
            services.AddTransient<AuthenticationHandler, AuthenticationHandler>();
            services.AddSingleton<IConfiguration>(this.Configuration);

            services
                .AddMvc()
                .AddJsonOptions(options => 
                {
                    //options.SerializerSettings.DateFormatString = "mm/dd/yy, dddd";
                    //options.SerializerSettings.Formatting = Formatting.Indented;
                });

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

            //RequestLocalizationOptions localizationOptions = new RequestLocalizationOptions
            //{
            //    SupportedCultures = new List<CultureInfo> { new CultureInfo("en-US") },
            //    SupportedUICultures = new List<CultureInfo> { new CultureInfo("en-US") },
            //    DefaultRequestCulture = new RequestCulture("en-US")
            //};
            //app.UseRequestLocalization(localizationOptions);


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
