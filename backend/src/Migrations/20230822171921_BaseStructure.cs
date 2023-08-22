using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class BaseStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Code = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Access",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DataInicio = table.Column<string>(type: "TEXT", nullable: false),
                    DataFim = table.Column<string>(type: "TEXT", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Access", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Access_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmotionDiaryEntry",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<string>(type: "TEXT", nullable: false),
                    Hour = table.Column<string>(type: "TEXT", nullable: false),
                    Sentimentos = table.Column<string>(type: "TEXT", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmotionDiaryEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmotionDiaryEntry_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MealDiaryEntry",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<string>(type: "TEXT", nullable: false),
                    Hour = table.Column<string>(type: "TEXT", nullable: false),
                    TipoRefeicao = table.Column<int>(type: "INTEGER", nullable: false),
                    SkippedMeal = table.Column<bool>(type: "INTEGER", nullable: false),
                    TimeOfMeal = table.Column<string>(type: "TEXT", nullable: true),
                    FeelingsAroundMeal = table.Column<string>(type: "TEXT", nullable: false),
                    ContentsOfMeal = table.Column<string>(type: "TEXT", nullable: true),
                    PlainAttention = table.Column<bool>(type: "INTEGER", nullable: true),
                    RestrainedConsumption = table.Column<bool>(type: "INTEGER", nullable: true),
                    HadAnEpisode = table.Column<bool>(type: "INTEGER", nullable: true),
                    HadCompensatoryBehaviour = table.Column<bool>(type: "INTEGER", nullable: true),
                    CompensatoryBehaviors = table.Column<string>(type: "TEXT", nullable: false),
                    Reflexao = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealDiaryEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MealDiaryEntry_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Modulo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ModuleNumberOrder = table.Column<int>(type: "INTEGER", nullable: false),
                    DataInicio = table.Column<string>(type: "TEXT", nullable: true),
                    DataFim = table.Column<string>(type: "TEXT", nullable: true),
                    Recompensa = table.Column<string>(type: "TEXT", nullable: true),
                    Utilidade = table.Column<int>(type: "INTEGER", nullable: true),
                    Satisfacao = table.Column<int>(type: "INTEGER", nullable: true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modulo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Modulo_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SubModule",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SubModuleNumberOrder = table.Column<int>(type: "INTEGER", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    DataInicio = table.Column<string>(type: "TEXT", nullable: true),
                    DataFim = table.Column<string>(type: "TEXT", nullable: true),
                    SubModule = table.Column<int>(type: "INTEGER", nullable: true),
                    SubModuleFavorites = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubModule", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubModule_EmotionDiaryEntry_SubModule",
                        column: x => x.SubModule,
                        principalTable: "EmotionDiaryEntry",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SubModule_Modulo_SubModule",
                        column: x => x.SubModule,
                        principalTable: "Modulo",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SubModule_Modulo_SubModuleFavorites",
                        column: x => x.SubModuleFavorites,
                        principalTable: "Modulo",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Access_UserId",
                table: "Access",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EmotionDiaryEntry_UserId",
                table: "EmotionDiaryEntry",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MealDiaryEntry_UserId",
                table: "MealDiaryEntry",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Modulo_UserId",
                table: "Modulo",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SubModule_SubModule",
                table: "SubModule",
                column: "SubModule");

            migrationBuilder.CreateIndex(
                name: "IX_SubModule_SubModuleFavorites",
                table: "SubModule",
                column: "SubModuleFavorites");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Access");

            migrationBuilder.DropTable(
                name: "MealDiaryEntry");

            migrationBuilder.DropTable(
                name: "SubModule");

            migrationBuilder.DropTable(
                name: "EmotionDiaryEntry");

            migrationBuilder.DropTable(
                name: "Modulo");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
