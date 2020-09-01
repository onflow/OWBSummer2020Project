using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GreatSmiles.Migrations
{
    public partial class finalmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DbCompetitions",
                columns: table => new
                {
                    CompetitionId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompetitionTitle = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Time = table.Column<DateTime>(nullable: false),
                    EntrantId = table.Column<int>(nullable: false),
                    PhotoId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DbCompetitions", x => x.CompetitionId);
                });

            migrationBuilder.CreateTable(
                name: "DbEntrants",
                columns: table => new
                {
                    EntrantId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EntrantName = table.Column<string>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DbEntrants", x => x.EntrantId);
                });

            migrationBuilder.CreateTable(
                name: "DbUsers",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 10, nullable: false),
                    LastName = table.Column<string>(maxLength: 15, nullable: false),
                    Email = table.Column<string>(nullable: false),
                    IsVerified = table.Column<bool>(nullable: false),
                    UserStory = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    CompetitionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DbUsers", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_DbUsers_DbCompetitions_CompetitionId",
                        column: x => x.CompetitionId,
                        principalTable: "DbCompetitions",
                        principalColumn: "CompetitionId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DbPhotos",
                columns: table => new
                {
                    PhotoId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PhotoName = table.Column<string>(nullable: false),
                    Story = table.Column<string>(nullable: false),
                    Theme = table.Column<string>(nullable: false),
                    Quality = table.Column<string>(nullable: true),
                    OfficialId = table.Column<int>(nullable: false),
                    VoterId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    CompetitionId = table.Column<int>(nullable: true),
                    EntrantId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DbPhotos", x => x.PhotoId);
                    table.ForeignKey(
                        name: "FK_DbPhotos_DbCompetitions_CompetitionId",
                        column: x => x.CompetitionId,
                        principalTable: "DbCompetitions",
                        principalColumn: "CompetitionId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DbPhotos_DbEntrants_EntrantId",
                        column: x => x.EntrantId,
                        principalTable: "DbEntrants",
                        principalColumn: "EntrantId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DbPhotos_DbUsers_OfficialId",
                        column: x => x.OfficialId,
                        principalTable: "DbUsers",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DbSmilers",
                columns: table => new
                {
                    SmilerId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    VoterId = table.Column<int>(nullable: false),
                    PhotoId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DbSmilers", x => x.SmilerId);
                    table.ForeignKey(
                        name: "FK_DbSmilers_DbPhotos_PhotoId",
                        column: x => x.PhotoId,
                        principalTable: "DbPhotos",
                        principalColumn: "PhotoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DbSmilers_DbUsers_VoterId",
                        column: x => x.VoterId,
                        principalTable: "DbUsers",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DbPhotos_CompetitionId",
                table: "DbPhotos",
                column: "CompetitionId");

            migrationBuilder.CreateIndex(
                name: "IX_DbPhotos_EntrantId",
                table: "DbPhotos",
                column: "EntrantId");

            migrationBuilder.CreateIndex(
                name: "IX_DbPhotos_OfficialId",
                table: "DbPhotos",
                column: "OfficialId");

            migrationBuilder.CreateIndex(
                name: "IX_DbSmilers_PhotoId",
                table: "DbSmilers",
                column: "PhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_DbSmilers_VoterId",
                table: "DbSmilers",
                column: "VoterId");

            migrationBuilder.CreateIndex(
                name: "IX_DbUsers_CompetitionId",
                table: "DbUsers",
                column: "CompetitionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DbSmilers");

            migrationBuilder.DropTable(
                name: "DbPhotos");

            migrationBuilder.DropTable(
                name: "DbEntrants");

            migrationBuilder.DropTable(
                name: "DbUsers");

            migrationBuilder.DropTable(
                name: "DbCompetitions");
        }
    }
}
