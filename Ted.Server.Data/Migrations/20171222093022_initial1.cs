using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Ted.Server.Data.Migrations
{
    public partial class initial1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Group",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    createdBy = table.Column<int>(nullable: false),
                    createdTime = table.Column<DateTime>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    description = table.Column<string>(nullable: true),
                    modifiedBy = table.Column<int>(nullable: false),
                    modifiedTime = table.Column<DateTime>(nullable: false),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Group", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    createdBy = table.Column<int>(nullable: false),
                    createdTime = table.Column<DateTime>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    email = table.Column<string>(nullable: true),
                    fullName = table.Column<string>(nullable: true),
                    isSuperUser = table.Column<bool>(nullable: false),
                    modifiedBy = table.Column<int>(nullable: false),
                    modifiedTime = table.Column<DateTime>(nullable: false),
                    password = table.Column<string>(nullable: true),
                    token = table.Column<string>(nullable: true),
                    workspaceList = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "UsersInGroups",
                columns: table => new
                {
                    userId = table.Column<int>(nullable: false),
                    groupId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersInGroups", x => new { x.userId, x.groupId });
                    table.ForeignKey(
                        name: "FK_UsersInGroups_Group_groupId",
                        column: x => x.groupId,
                        principalTable: "Group",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersInGroups_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Workspaces",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Userid = table.Column<int>(nullable: true),
                    componentModifiers = table.Column<string>(nullable: true),
                    componentTree = table.Column<string>(nullable: true),
                    createdBy = table.Column<int>(nullable: false),
                    createdTime = table.Column<DateTime>(nullable: false),
                    deleted = table.Column<bool>(nullable: false),
                    description = table.Column<string>(nullable: true),
                    eventHandlers = table.Column<string>(nullable: true),
                    modifiedBy = table.Column<int>(nullable: false),
                    modifiedTime = table.Column<DateTime>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    securityGroups = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workspaces", x => x.id);
                    table.ForeignKey(
                        name: "FK_Workspaces_Users_Userid",
                        column: x => x.Userid,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UsersInGroups_groupId",
                table: "UsersInGroups",
                column: "groupId");

            migrationBuilder.CreateIndex(
                name: "IX_Workspaces_Userid",
                table: "Workspaces",
                column: "Userid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsersInGroups");

            migrationBuilder.DropTable(
                name: "Workspaces");

            migrationBuilder.DropTable(
                name: "Group");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
