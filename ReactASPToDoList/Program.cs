using Microsoft.EntityFrameworkCore;
using ReactASPToDoList.Data;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

var sLog = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext() // barevnì
    .WriteTo.Console()
    .WriteTo.File("Logs\\log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();
builder.Logging.ClearProviders();
builder.Logging.AddSerilog(sLog);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlServer(connectionString);
});
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
