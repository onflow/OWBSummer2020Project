using Microsoft.EntityFrameworkCore.Migrations;

namespace GreatSmiles.Migrations
{
    public partial class albummigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DbUsers_DbCompetitions_CompetitionId",
                table: "DbUsers");

            migrationBuilder.DropIndex(
                name: "IX_DbUsers_CompetitionId",
                table: "DbUsers");

            migrationBuilder.DropColumn(
                name: "CompetitionId",
                table: "DbUsers");

            migrationBuilder.AddColumn<int>(
                name: "EntrantId",
                table: "DbUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "DbEntrants",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "DbCompetitions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DbUsers_EntrantId",
                table: "DbUsers",
                column: "EntrantId");

            migrationBuilder.CreateIndex(
                name: "IX_DbEntrants_UserId",
                table: "DbEntrants",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DbCompetitions_UserId",
                table: "DbCompetitions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DbCompetitions_DbUsers_UserId",
                table: "DbCompetitions",
                column: "UserId",
                principalTable: "DbUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DbEntrants_DbUsers_UserId",
                table: "DbEntrants",
                column: "UserId",
                principalTable: "DbUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DbUsers_DbEntrants_EntrantId",
                table: "DbUsers",
                column: "EntrantId",
                principalTable: "DbEntrants",
                principalColumn: "EntrantId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DbCompetitions_DbUsers_UserId",
                table: "DbCompetitions");

            migrationBuilder.DropForeignKey(
                name: "FK_DbEntrants_DbUsers_UserId",
                table: "DbEntrants");

            migrationBuilder.DropForeignKey(
                name: "FK_DbUsers_DbEntrants_EntrantId",
                table: "DbUsers");

            migrationBuilder.DropIndex(
                name: "IX_DbUsers_EntrantId",
                table: "DbUsers");

            migrationBuilder.DropIndex(
                name: "IX_DbEntrants_UserId",
                table: "DbEntrants");

            migrationBuilder.DropIndex(
                name: "IX_DbCompetitions_UserId",
                table: "DbCompetitions");

            migrationBuilder.DropColumn(
                name: "EntrantId",
                table: "DbUsers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "DbEntrants");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "DbCompetitions");

            migrationBuilder.AddColumn<int>(
                name: "CompetitionId",
                table: "DbUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DbUsers_CompetitionId",
                table: "DbUsers",
                column: "CompetitionId");

            migrationBuilder.AddForeignKey(
                name: "FK_DbUsers_DbCompetitions_CompetitionId",
                table: "DbUsers",
                column: "CompetitionId",
                principalTable: "DbCompetitions",
                principalColumn: "CompetitionId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
