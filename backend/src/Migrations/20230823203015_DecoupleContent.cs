using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class DecoupleContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercicio_Modulo_ExerciseFav",
                table: "Exercicio");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercicio_SubModule_SubModuleId",
                table: "Exercicio");

            migrationBuilder.DropForeignKey(
                name: "FK_SubModule_EmotionDiaryEntry_SubModule",
                table: "SubModule");

            migrationBuilder.DropForeignKey(
                name: "FK_SubModule_Modulo_SubModule",
                table: "SubModule");

            migrationBuilder.DropTable(
                name: "Modulo");

            migrationBuilder.DropColumn(
                name: "DataFim",
                table: "SubModule");

            migrationBuilder.RenameColumn(
                name: "SubModule",
                table: "SubModule",
                newName: "SubModuleContent");

            migrationBuilder.RenameColumn(
                name: "DataInicio",
                table: "SubModule",
                newName: "Text");

            migrationBuilder.RenameIndex(
                name: "IX_SubModule_SubModule",
                table: "SubModule",
                newName: "IX_SubModule_SubModuleContent");

            migrationBuilder.RenameColumn(
                name: "SubModuleId",
                table: "Exercicio",
                newName: "SubModuleExercicios");

            migrationBuilder.RenameIndex(
                name: "IX_Exercicio_SubModuleId",
                table: "Exercicio",
                newName: "IX_Exercicio_SubModuleExercicios");

            migrationBuilder.AlterColumn<string>(
                name: "ExerciseFav",
                table: "Exercicio",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmotionDiaryEntryId",
                table: "Exercicio",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ModuloContent",
                columns: table => new
                {
                    ModuleNumberOrder = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModuloContent", x => x.ModuleNumberOrder);
                });

            migrationBuilder.CreateTable(
                name: "ModuloUserProgress",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ModuloContentModuleNumberOrder = table.Column<int>(type: "INTEGER", nullable: false),
                    DataInicio = table.Column<string>(type: "TEXT", nullable: true),
                    DataFim = table.Column<string>(type: "TEXT", nullable: true),
                    Recompensa = table.Column<string>(type: "TEXT", nullable: true),
                    Utilidade = table.Column<int>(type: "INTEGER", nullable: true),
                    Satisfacao = table.Column<int>(type: "INTEGER", nullable: true),
                    UserModulos = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModuloUserProgress", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ModuloUserProgress_ModuloContent_ModuloContentModuleNumberOrder",
                        column: x => x.ModuloContentModuleNumberOrder,
                        principalTable: "ModuloContent",
                        principalColumn: "ModuleNumberOrder",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ModuloUserProgress_User_UserModulos",
                        column: x => x.UserModulos,
                        principalTable: "User",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateTable(
                name: "SubModuleUserProgress",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SubModuleId = table.Column<int>(type: "INTEGER", nullable: false),
                    DataInicio = table.Column<string>(type: "TEXT", nullable: true),
                    DataFim = table.Column<string>(type: "TEXT", nullable: true),
                    ModuloUserProgressId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubModuleUserProgress", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubModuleUserProgress_ModuloUserProgress_ModuloUserProgressId",
                        column: x => x.ModuloUserProgressId,
                        principalTable: "ModuloUserProgress",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SubModuleUserProgress_SubModule_SubModuleId",
                        column: x => x.SubModuleId,
                        principalTable: "SubModule",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exercicio_EmotionDiaryEntryId",
                table: "Exercicio",
                column: "EmotionDiaryEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_ModuloUserProgress_ModuloContentModuleNumberOrder",
                table: "ModuloUserProgress",
                column: "ModuloContentModuleNumberOrder");

            migrationBuilder.CreateIndex(
                name: "IX_ModuloUserProgress_UserModulos",
                table: "ModuloUserProgress",
                column: "UserModulos");

            migrationBuilder.CreateIndex(
                name: "IX_SubModuleUserProgress_ModuloUserProgressId",
                table: "SubModuleUserProgress",
                column: "ModuloUserProgressId");

            migrationBuilder.CreateIndex(
                name: "IX_SubModuleUserProgress_SubModuleId",
                table: "SubModuleUserProgress",
                column: "SubModuleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercicio_EmotionDiaryEntry_EmotionDiaryEntryId",
                table: "Exercicio",
                column: "EmotionDiaryEntryId",
                principalTable: "EmotionDiaryEntry",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercicio_SubModule_SubModuleExercicios",
                table: "Exercicio",
                column: "SubModuleExercicios",
                principalTable: "SubModule",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercicio_User_ExerciseFav",
                table: "Exercicio",
                column: "ExerciseFav",
                principalTable: "User",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_SubModule_ModuloContent_SubModuleContent",
                table: "SubModule",
                column: "SubModuleContent",
                principalTable: "ModuloContent",
                principalColumn: "ModuleNumberOrder");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercicio_EmotionDiaryEntry_EmotionDiaryEntryId",
                table: "Exercicio");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercicio_SubModule_SubModuleExercicios",
                table: "Exercicio");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercicio_User_ExerciseFav",
                table: "Exercicio");

            migrationBuilder.DropForeignKey(
                name: "FK_SubModule_ModuloContent_SubModuleContent",
                table: "SubModule");

            migrationBuilder.DropTable(
                name: "SubModuleUserProgress");

            migrationBuilder.DropTable(
                name: "ModuloUserProgress");

            migrationBuilder.DropTable(
                name: "ModuloContent");

            migrationBuilder.DropIndex(
                name: "IX_Exercicio_EmotionDiaryEntryId",
                table: "Exercicio");

            migrationBuilder.DropColumn(
                name: "EmotionDiaryEntryId",
                table: "Exercicio");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "SubModule",
                newName: "DataInicio");

            migrationBuilder.RenameColumn(
                name: "SubModuleContent",
                table: "SubModule",
                newName: "SubModule");

            migrationBuilder.RenameIndex(
                name: "IX_SubModule_SubModuleContent",
                table: "SubModule",
                newName: "IX_SubModule_SubModule");

            migrationBuilder.RenameColumn(
                name: "SubModuleExercicios",
                table: "Exercicio",
                newName: "SubModuleId");

            migrationBuilder.RenameIndex(
                name: "IX_Exercicio_SubModuleExercicios",
                table: "Exercicio",
                newName: "IX_Exercicio_SubModuleId");

            migrationBuilder.AddColumn<string>(
                name: "DataFim",
                table: "SubModule",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ExerciseFav",
                table: "Exercicio",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Modulo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DataFim = table.Column<string>(type: "TEXT", nullable: true),
                    DataInicio = table.Column<string>(type: "TEXT", nullable: true),
                    ModuleNumberOrder = table.Column<int>(type: "INTEGER", nullable: false),
                    Recompensa = table.Column<string>(type: "TEXT", nullable: true),
                    Satisfacao = table.Column<int>(type: "INTEGER", nullable: true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    UserModulos = table.Column<string>(type: "TEXT", nullable: true),
                    Utilidade = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modulo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Modulo_User_UserModulos",
                        column: x => x.UserModulos,
                        principalTable: "User",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Modulo_UserModulos",
                table: "Modulo",
                column: "UserModulos");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercicio_Modulo_ExerciseFav",
                table: "Exercicio",
                column: "ExerciseFav",
                principalTable: "Modulo",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercicio_SubModule_SubModuleId",
                table: "Exercicio",
                column: "SubModuleId",
                principalTable: "SubModule",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubModule_EmotionDiaryEntry_SubModule",
                table: "SubModule",
                column: "SubModule",
                principalTable: "EmotionDiaryEntry",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubModule_Modulo_SubModule",
                table: "SubModule",
                column: "SubModule",
                principalTable: "Modulo",
                principalColumn: "Id");
        }
    }
}
