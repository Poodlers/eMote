using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectLaws_PoliticalParties_ProposingPartypartyAcronym",
                table: "ProjectLaws");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectLaws_VotingResult_VotingResultGeneralityId",
                table: "ProjectLaws");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectLaws_VotingResult_VotingResultSpecialityId",
                table: "ProjectLaws");

            migrationBuilder.DropTable(
                name: "PartyStats");

            migrationBuilder.DropTable(
                name: "Vote");

            migrationBuilder.DropTable(
                name: "VotingBlock");

            migrationBuilder.DropTable(
                name: "PoliticalParties");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "VotingResult");

            migrationBuilder.DropIndex(
                name: "IX_ProjectLaws_ProposingPartypartyAcronym",
                table: "ProjectLaws");

            migrationBuilder.DropIndex(
                name: "IX_ProjectLaws_VotingResultGeneralityId",
                table: "ProjectLaws");

            migrationBuilder.DropIndex(
                name: "IX_ProjectLaws_VotingResultSpecialityId",
                table: "ProjectLaws");

            migrationBuilder.DropColumn(
                name: "FullProposalTextLink",
                table: "ProjectLaws");

            migrationBuilder.DropColumn(
                name: "Legislatura",
                table: "ProjectLaws");

            migrationBuilder.DropColumn(
                name: "ProposalResult",
                table: "ProjectLaws");

            migrationBuilder.DropColumn(
                name: "ProposalTextHTML",
                table: "ProjectLaws");

            migrationBuilder.DropColumn(
                name: "ProposalTitle",
                table: "ProjectLaws");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "ProjectLaws");

            migrationBuilder.DropColumn(
                name: "SourceId",
                table: "ProjectLaws");

            migrationBuilder.DropColumn(
                name: "VotingResultGeneralityId",
                table: "ProjectLaws");

            migrationBuilder.DropColumn(
                name: "VotingResultSpecialityId",
                table: "ProjectLaws");

            migrationBuilder.DropColumn(
                name: "amountOfUsersInterested",
                table: "ProjectLaws");

            migrationBuilder.RenameColumn(
                name: "totalAmountOfVotesFromUsers",
                table: "ProjectLaws",
                newName: "Role");

            migrationBuilder.RenameColumn(
                name: "VoteDate",
                table: "ProjectLaws",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "ProposingPartypartyAcronym",
                table: "ProjectLaws",
                newName: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Role",
                table: "ProjectLaws",
                newName: "totalAmountOfVotesFromUsers");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "ProjectLaws",
                newName: "VoteDate");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "ProjectLaws",
                newName: "ProposingPartypartyAcronym");

            migrationBuilder.AddColumn<string>(
                name: "FullProposalTextLink",
                table: "ProjectLaws",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Legislatura",
                table: "ProjectLaws",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ProposalResult",
                table: "ProjectLaws",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProposalTextHTML",
                table: "ProjectLaws",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProposalTitle",
                table: "ProjectLaws",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "ProjectLaws",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SourceId",
                table: "ProjectLaws",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VotingResultGeneralityId",
                table: "ProjectLaws",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VotingResultSpecialityId",
                table: "ProjectLaws",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "amountOfUsersInterested",
                table: "ProjectLaws",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PoliticalParties",
                columns: table => new
                {
                    partyAcronym = table.Column<string>(type: "TEXT", nullable: false),
                    fullName = table.Column<string>(type: "TEXT", nullable: false),
                    logoLink = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PoliticalParties", x => x.partyAcronym);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    ProfilePic = table.Column<int>(type: "INTEGER", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", nullable: false),
                    facebookIDToken = table.Column<string>(type: "TEXT", nullable: true),
                    googleIDToken = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VotingResult",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    isUninamous = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VotingResult", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PartyStats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PoliticalPartypartyAcronym = table.Column<string>(type: "TEXT", nullable: false),
                    PartyAffectionScore = table.Column<double>(type: "REAL", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: true),
                    totalAffectionPoints = table.Column<double>(type: "REAL", nullable: false),
                    totalAmountOfProposalsVotedOn = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartyStats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PartyStats_PoliticalParties_PoliticalPartypartyAcronym",
                        column: x => x.PoliticalPartypartyAcronym,
                        principalTable: "PoliticalParties",
                        principalColumn: "partyAcronym",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PartyStats_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Vote",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ProjectLawID = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: true),
                    VoteDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    VotingOrientation = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vote", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vote_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "VotingBlock",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VotingResultId = table.Column<int>(type: "INTEGER", nullable: true),
                    isUninamousWithinParty = table.Column<bool>(type: "INTEGER", nullable: true),
                    numberOfDeputies = table.Column<int>(type: "INTEGER", nullable: true),
                    politicalPartyAcronym = table.Column<string>(type: "TEXT", nullable: false),
                    votingOrientation = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VotingBlock", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VotingBlock_VotingResult_VotingResultId",
                        column: x => x.VotingResultId,
                        principalTable: "VotingResult",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "PoliticalParties",
                columns: new[] { "partyAcronym", "fullName", "logoLink" },
                values: new object[,]
                {
                    { "BE", "Bloco de Esquerda", "https://pt.wikipedia.org/wiki/Bloco_de_Esquerda" },
                    { "CDSPP", "Coligação Democrática Unitária", "https://pt.m.wikipedia.org/wiki/Ficheiro:CDS_%E2%80%93_People%27s_Party_logo.svg" },
                    { "CH", "Chega", "https://en.wikipedia.org/wiki/File:Logo_of_the_Chega_(political_party).svg" },
                    { "Governo", "Governo", "https://pt.wikipedia.org/wiki/Ficheiro:Trollface.png" },
                    { "IL", "Iniciativa Liberal", "https://pt.m.wikipedia.org/wiki/Ficheiro:Iniciativa_Liberal_logo_1.png" },
                    { "L", "Partido Livre", "https://pt.m.wikipedia.org/wiki/Ficheiro:Partido_LIVRE_logo.png" },
                    { "PAN", "Pessoas-Animais-Natureza", "https://pt.wikipedia.org/wiki/Pessoas%E2%80%93Animais%E2%80%93Natureza" },
                    { "PCP", "Partido Comunista Português", "https://pt.m.wikipedia.org/wiki/Ficheiro:Portuguese_Communist_Party_logo.svg" },
                    { "PS", "Partido Socialista", "https://pt.wikipedia.org/wiki/Ficheiro:Partido_Socialista_%28Portugal%29.png" },
                    { "PSD", "Partido Social-Democrata", "https://pt.wikipedia.org/wiki/Ficheiro:Logo_PSD_cor.PNG" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectLaws_ProposingPartypartyAcronym",
                table: "ProjectLaws",
                column: "ProposingPartypartyAcronym");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectLaws_VotingResultGeneralityId",
                table: "ProjectLaws",
                column: "VotingResultGeneralityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectLaws_VotingResultSpecialityId",
                table: "ProjectLaws",
                column: "VotingResultSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_PartyStats_PoliticalPartypartyAcronym",
                table: "PartyStats",
                column: "PoliticalPartypartyAcronym");

            migrationBuilder.CreateIndex(
                name: "IX_PartyStats_UserId",
                table: "PartyStats",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Vote_UserId",
                table: "Vote",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_VotingBlock_VotingResultId",
                table: "VotingBlock",
                column: "VotingResultId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectLaws_PoliticalParties_ProposingPartypartyAcronym",
                table: "ProjectLaws",
                column: "ProposingPartypartyAcronym",
                principalTable: "PoliticalParties",
                principalColumn: "partyAcronym",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectLaws_VotingResult_VotingResultGeneralityId",
                table: "ProjectLaws",
                column: "VotingResultGeneralityId",
                principalTable: "VotingResult",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectLaws_VotingResult_VotingResultSpecialityId",
                table: "ProjectLaws",
                column: "VotingResultSpecialityId",
                principalTable: "VotingResult",
                principalColumn: "Id");
        }
    }
}
