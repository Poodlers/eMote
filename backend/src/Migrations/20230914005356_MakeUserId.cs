using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class MakeUserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {


            migrationBuilder.DropForeignKey(
                name: "FK_Access_User_UserAccesses",
                table: "Access");

            migrationBuilder.DropForeignKey(
                name: "FK_EmotionDiaryEntry_User_UserEmotionDiaries",
                table: "EmotionDiaryEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercicio_User_ExerciseFav",
                table: "Exercicio");

            migrationBuilder.DropForeignKey(
                name: "FK_MealDiaryEntry_User_UserFoodDiaries",
                table: "MealDiaryEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_ModuloUserProgress_User_UserModulos",
                table: "ModuloUserProgress");




            migrationBuilder.AlterColumn<int>(
                name: "UserModulos",
                table: "ModuloUserProgress",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserFoodDiaries",
                table: "MealDiaryEntry",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ExerciseFav",
                table: "Exercicio",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserEmotionDiaries",
                table: "EmotionDiaryEntry",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserAccesses",
                table: "Access",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);



            migrationBuilder.AddForeignKey(
                name: "FK_Access_User_UserAccesses",
                table: "Access",
                column: "UserAccesses",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmotionDiaryEntry_User_UserEmotionDiaries",
                table: "EmotionDiaryEntry",
                column: "UserEmotionDiaries",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercicio_User_ExerciseFav",
                table: "Exercicio",
                column: "ExerciseFav",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MealDiaryEntry_User_UserFoodDiaries",
                table: "MealDiaryEntry",
                column: "UserFoodDiaries",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ModuloUserProgress_User_UserModulos",
                table: "ModuloUserProgress",
                column: "UserModulos",
                principalTable: "User",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Access_User_UserAccesses",
                table: "Access");

            migrationBuilder.DropForeignKey(
                name: "FK_EmotionDiaryEntry_User_UserEmotionDiaries",
                table: "EmotionDiaryEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercicio_User_ExerciseFav",
                table: "Exercicio");

            migrationBuilder.DropForeignKey(
                name: "FK_MealDiaryEntry_User_UserFoodDiaries",
                table: "MealDiaryEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_ModuloUserProgress_User_UserModulos",
                table: "ModuloUserProgress");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "User",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AlterColumn<string>(
                name: "UserModulos",
                table: "ModuloUserProgress",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserFoodDiaries",
                table: "MealDiaryEntry",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ExerciseFav",
                table: "Exercicio",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserEmotionDiaries",
                table: "EmotionDiaryEntry",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserAccesses",
                table: "Access",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_Access_User_UserAccesses",
                table: "Access",
                column: "UserAccesses",
                principalTable: "User",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_EmotionDiaryEntry_User_UserEmotionDiaries",
                table: "EmotionDiaryEntry",
                column: "UserEmotionDiaries",
                principalTable: "User",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercicio_User_ExerciseFav",
                table: "Exercicio",
                column: "ExerciseFav",
                principalTable: "User",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_MealDiaryEntry_User_UserFoodDiaries",
                table: "MealDiaryEntry",
                column: "UserFoodDiaries",
                principalTable: "User",
                principalColumn: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_ModuloUserProgress_User_UserModulos",
                table: "ModuloUserProgress",
                column: "UserModulos",
                principalTable: "User",
                principalColumn: "Code");
        }
    }
}
