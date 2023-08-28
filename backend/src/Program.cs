using backend.Common;
using backend.Models;

using FluentValidation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DatabaseContext>();

// Add services to the container.
builder.Services.AddControllers();

/*
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureEndpointDefaults(listenOptions =>
    {
        listenOptions.UseHttps();
    });
});

*/
// Add FluentValidation
// Scans the Assembly, find all the abstract validators and add them for us
builder.Services.AddValidatorsFromAssemblyContaining<IAssemblyMarker>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHealthChecks();

builder.Services.AddCors(options =>
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader()));


builder.Services.AddScoped<UserAccessService>();
builder.Services.AddSingleton<PeriodicHostedService>();
builder.Services.AddHostedService(
    provider => provider.GetRequiredService<PeriodicHostedService>());

var app = builder.Build();


// log environment
app.Logger.LogInformation($"Environment: {app.Environment.EnvironmentName}");


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(x => { x.SwaggerEndpoint("/swagger/v1/swagger.yaml", "Swagger API"); });
}


app.UseCors(builder =>
      {
          builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS")
                .SetPreflightMaxAge(TimeSpan.FromSeconds(3600));

      }
);

app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    app.MapControllers();
    endpoints.MapControllers();
});

app.MapGet("/background", (
    PeriodicHostedService service) =>
{
    return new PeriodicHostedServiceState(service.IsEnabled);
});

app.MapMethods("/background", new[] { "PATCH" }, (
    PeriodicHostedServiceState state,
    PeriodicHostedService service) =>
{
    service.IsEnabled = state.IsEnabled;
});




//seed database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<DatabaseContext>();
    context.Database.EnsureCreated();

    var moduloContent = context.Set<ModuloContent>();

    if (!moduloContent.Any())
    {
        var modulos = ModuloSeeder.SeedModulo();
        moduloContent.AddRange(modulos);
        context.SaveChanges();
    }


}


app.MapHealthChecks("/healthz");



app.Run();

public partial class Program { }