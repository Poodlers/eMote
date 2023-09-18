using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddExercises : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubModule_Modulo_SubModuleFavorites",
                table: "SubModule");

            migrationBuilder.DropIndex(
                name: "IX_SubModule_SubModuleFavorites",
                table: "SubModule");

            migrationBuilder.DropColumn(
                name: "SubModuleFavorites",
                table: "SubModule");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Modulo",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Exercicio",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ExercicioName = table.Column<string>(type: "TEXT", nullable: false),
                    ExercicioFile = table.Column<string>(type: "TEXT", nullable: false),
                    ExerciseFav = table.Column<int>(type: "INTEGER", nullable: true),
                    SubModuleId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercicio", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Exercicio_Modulo_ExerciseFav",
                        column: x => x.ExerciseFav,
                        principalTable: "Modulo",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Exercicio_SubModule_SubModuleId",
                        column: x => x.SubModuleId,
                        principalTable: "SubModule",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exercicio_ExerciseFav",
                table: "Exercicio",
                column: "ExerciseFav");

            migrationBuilder.CreateIndex(
                name: "IX_Exercicio_SubModuleId",
                table: "Exercicio",
                column: "SubModuleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Exercicio");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Modulo");

            migrationBuilder.AddColumn<int>(
                name: "SubModuleFavorites",
                table: "SubModule",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubModule_SubModuleFavorites",
                table: "SubModule",
                column: "SubModuleFavorites");

            migrationBuilder.AddForeignKey(
                name: "FK_SubModule_Modulo_SubModuleFavorites",
                table: "SubModule",
                column: "SubModuleFavorites",
                principalTable: "Modulo",
                principalColumn: "Id");
        }
    }
}
