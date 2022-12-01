using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactASPToDoList.Migrations
{
    public partial class _01init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    TaskId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Finished = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.TaskId);
                    table.ForeignKey(
                        name: "FK_Tasks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Password", "UserName" },
                values: new object[] { 1, "180407B4F4EAAD5CD17FCDC15E55A6A1", "bobik" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Password", "UserName" },
                values: new object[] { 2, "8CB273BEA4AEFCF205DDEA6D241BE474", "jirka" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "TaskId", "Description", "Finished", "Name", "Time", "UserId" },
                values: new object[] { 1, "dokončit binární strom", false, "úkol z PRG", new DateTime(2022, 12, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "TaskId", "Description", "Finished", "Name", "Time", "UserId" },
                values: new object[] { 2, "zpracovat referát o Karlu Čapkovi", true, "úkol z ČJL", new DateTime(2022, 11, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "TaskId", "Description", "Finished", "Name", "Time", "UserId" },
                values: new object[] { 3, "až přijdu domů, tak okamžitě umyji nádobí", false, "umýt špinavé nádobí", new DateTime(2022, 12, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_UserId",
                table: "Tasks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserName",
                table: "Users",
                column: "UserName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
