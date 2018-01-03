using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Ted.Server.Data.Migrations
{
    public partial class treenode4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    createdBy = table.Column<int>(nullable: true),
                    createdTime = table.Column<DateTime>(nullable: true),
                    deleted = table.Column<bool>(nullable: false),
                    email = table.Column<string>(nullable: true),
                    fullName = table.Column<string>(nullable: true),
                    isSuperUser = table.Column<bool>(nullable: false),
                    modifiedBy = table.Column<int>(nullable: true),
                    modifiedTime = table.Column<DateTime>(nullable: true),
                    password = table.Column<string>(nullable: true),
                    token = table.Column<string>(nullable: true),
                    workspaceList = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Workspaces",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false),
                    componentTree = table.Column<string>(nullable: true),
                    createdBy = table.Column<int>(nullable: true),
                    createdTime = table.Column<DateTime>(nullable: true),
                    deleted = table.Column<bool>(nullable: false),
                    description = table.Column<string>(nullable: true),
                    eventHandlers = table.Column<string>(nullable: true),
                    modifiedBy = table.Column<int>(nullable: true),
                    modifiedTime = table.Column<DateTime>(nullable: true),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workspaces", x => x.id);
                    table.ForeignKey(
                        name: "FK_Workspaces_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ComponentModifier",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Workspaceid = table.Column<int>(nullable: true),
                    action = table.Column<int>(nullable: false),
                    properties = table.Column<string>(nullable: true),
                    reference = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComponentModifier", x => x.id);
                    table.ForeignKey(
                        name: "FK_ComponentModifier_Workspaces_Workspaceid",
                        column: x => x.Workspaceid,
                        principalTable: "Workspaces",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Group",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Workspaceid = table.Column<int>(nullable: true),
                    createdBy = table.Column<int>(nullable: true),
                    createdTime = table.Column<DateTime>(nullable: true),
                    deleted = table.Column<bool>(nullable: false),
                    description = table.Column<string>(nullable: true),
                    modifiedBy = table.Column<int>(nullable: true),
                    modifiedTime = table.Column<DateTime>(nullable: true),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Group", x => x.id);
                    table.ForeignKey(
                        name: "FK_Group_Workspaces_Workspaceid",
                        column: x => x.Workspaceid,
                        principalTable: "Workspaces",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Nodes",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TreeNodeid = table.Column<int>(nullable: true),
                    Workspaceid = table.Column<int>(nullable: true),
                    createdBy = table.Column<int>(nullable: true),
                    createdTime = table.Column<DateTime>(nullable: true),
                    deleted = table.Column<bool>(nullable: false),
                    modifiedBy = table.Column<int>(nullable: true),
                    modifiedTime = table.Column<DateTime>(nullable: true),
                    text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nodes", x => x.id);
                    table.ForeignKey(
                        name: "FK_Nodes_Nodes_TreeNodeid",
                        column: x => x.TreeNodeid,
                        principalTable: "Nodes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Nodes_Workspaces_Workspaceid",
                        column: x => x.Workspaceid,
                        principalTable: "Workspaces",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AccessModifier",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Workspaceid = table.Column<int>(nullable: true),
                    groupid = table.Column<int>(nullable: true),
                    isHidden = table.Column<bool>(nullable: false),
                    isProtected = table.Column<bool>(nullable: false),
                    isReadOnly = table.Column<bool>(nullable: false),
                    reference = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessModifier", x => x.id);
                    table.ForeignKey(
                        name: "FK_AccessModifier_Workspaces_Workspaceid",
                        column: x => x.Workspaceid,
                        principalTable: "Workspaces",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AccessModifier_Group_groupid",
                        column: x => x.groupid,
                        principalTable: "Group",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
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

            migrationBuilder.CreateIndex(
                name: "IX_AccessModifier_Workspaceid",
                table: "AccessModifier",
                column: "Workspaceid");

            migrationBuilder.CreateIndex(
                name: "IX_AccessModifier_groupid",
                table: "AccessModifier",
                column: "groupid");

            migrationBuilder.CreateIndex(
                name: "IX_ComponentModifier_Workspaceid",
                table: "ComponentModifier",
                column: "Workspaceid");

            migrationBuilder.CreateIndex(
                name: "IX_Group_Workspaceid",
                table: "Group",
                column: "Workspaceid");

            migrationBuilder.CreateIndex(
                name: "IX_Nodes_TreeNodeid",
                table: "Nodes",
                column: "TreeNodeid");

            migrationBuilder.CreateIndex(
                name: "IX_Nodes_Workspaceid",
                table: "Nodes",
                column: "Workspaceid");

            migrationBuilder.CreateIndex(
                name: "IX_UsersInGroups_groupId",
                table: "UsersInGroups",
                column: "groupId");

            migrationBuilder.CreateIndex(
                name: "IX_Workspaces_UserId",
                table: "Workspaces",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccessModifier");

            migrationBuilder.DropTable(
                name: "ComponentModifier");

            migrationBuilder.DropTable(
                name: "Nodes");

            migrationBuilder.DropTable(
                name: "UsersInGroups");

            migrationBuilder.DropTable(
                name: "Group");

            migrationBuilder.DropTable(
                name: "Workspaces");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
