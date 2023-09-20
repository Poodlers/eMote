using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddModuleNumberToExercise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasAccessToApp",
                table: "User",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<float>(
                name: "UserProgress",
                table: "ModuloUserProgress",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "ModuloNumberOrder",
                table: "Exercicio",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasAccessToApp",
                table: "User");

            migrationBuilder.DropColumn(
                name: "UserProgress",
                table: "ModuloUserProgress");

            migrationBuilder.DropColumn(
                name: "ModuloNumberOrder",
                table: "Exercicio");
        }
    }
}
