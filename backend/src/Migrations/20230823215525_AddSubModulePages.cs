using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddSubModulePages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercicio_SubModule_SubModuleExercicios",
                table: "Exercicio");

            migrationBuilder.DropColumn(
                name: "ImageFile",
                table: "SubModule");

            migrationBuilder.DropColumn(
                name: "OtherFile",
                table: "SubModule");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "SubModule");

            migrationBuilder.DropColumn(
                name: "VideoFile",
                table: "SubModule");

            migrationBuilder.CreateTable(
                name: "SubModulePage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Text = table.Column<string>(type: "TEXT", nullable: true),
                    VideoFile = table.Column<string>(type: "TEXT", nullable: true),
                    ImageFile = table.Column<string>(type: "TEXT", nullable: true),
                    OtherFile = table.Column<string>(type: "TEXT", nullable: true),
                    SubModuleId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubModulePage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubModulePage_SubModule_SubModuleId",
                        column: x => x.SubModuleId,
                        principalTable: "SubModule",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubModulePage_SubModuleId",
                table: "SubModulePage",
                column: "SubModuleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercicio_SubModulePage_SubModuleExercicios",
                table: "Exercicio",
                column: "SubModuleExercicios",
                principalTable: "SubModulePage",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercicio_SubModulePage_SubModuleExercicios",
                table: "Exercicio");

            migrationBuilder.DropTable(
                name: "SubModulePage");

            migrationBuilder.AddColumn<string>(
                name: "ImageFile",
                table: "SubModule",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherFile",
                table: "SubModule",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "SubModule",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VideoFile",
                table: "SubModule",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Exercicio_SubModule_SubModuleExercicios",
                table: "Exercicio",
                column: "SubModuleExercicios",
                principalTable: "SubModule",
                principalColumn: "Id");
        }
    }
}
