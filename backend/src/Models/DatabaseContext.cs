using EntityCollectionSerializerExample.Converters;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace backend.Models;

public class DatabaseContext : DbContext
{
    public DatabaseContext() { }

    public DatabaseContext(DbContextOptions options)
        : base(options)
    { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (optionsBuilder.IsConfigured) return;

        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.local.json", optional: true)
            .Build();
        var databaseFilePath = configuration.GetSection("DatabaseFilePath").Value ?? "./db.sqlite";
        optionsBuilder.UseSqlite(@"Data Source=" + databaseFilePath + @";foreign keys=true;",
         o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        base.OnModelCreating(modelBuilder);


        var SentimentoConverter = new EnumCollectionJsonValueConverter<Sentimento>();
        var SentimentoComparer = new CollectionValueComparer<Sentimento>();

        var CompensatoryConverter = new EnumCollectionJsonValueConverter<CompensatoryBehavior>();
        var CompensatoryComparer = new CollectionValueComparer<CompensatoryBehavior>();

        modelBuilder.Entity<EmotionDiaryEntry>()
        .Property(e => e.Sentimentos)
        .HasConversion(SentimentoConverter!)
        .Metadata.SetValueComparer(SentimentoComparer);

        modelBuilder.Entity<MealDiaryEntry>()
        .Property(e => e.CompensatoryBehaviors)
        .HasConversion(CompensatoryConverter!)
        .Metadata.SetValueComparer(CompensatoryComparer);

        modelBuilder.Entity<MealDiaryEntry>()
        .Property(e => e.FeelingsAroundMeal)
        .HasConversion(SentimentoConverter!)
        .Metadata.SetValueComparer(SentimentoComparer);


        modelBuilder.Entity<ModuloContent>(
            x =>
            x.HasMany<SubModule>("SubModules")
            .WithOne()

            );

        modelBuilder.Entity<SubModule>(
            x =>
            x.HasMany<SubModulePage>("SubModulePages")
            .WithOne()
            );


    }


    public DbSet<User>? User { get; set; }

    public DbSet<SubModule>? SubModule { get; set; }

    public DbSet<Exercicio>? Exercicio { get; set; }

    public DbSet<ModuloContent>? ModuloContent { get; set; }


}