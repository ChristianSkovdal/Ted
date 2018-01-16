using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Ted.Server.Data.Migrations
{
    public partial class foo1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Group_Workspaces_Workspaceid",
                table: "Group");

            migrationBuilder.DropTable(
                name: "AccessModifier");

            migrationBuilder.DropTable(
                name: "ComponentModifier");

            migrationBuilder.DropTable(
                name: "Nodes");

            migrationBuilder.DropIndex(
                name: "IX_Group_Workspaceid",
                table: "Group");

            migrationBuilder.DropColumn(
                name: "componentTree",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "eventHandlers",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "Workspaceid",
                table: "Group");

            migrationBuilder.AddColumn<int>(
                name: "startPageId",
                table: "Workspaces",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Pages",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Pageid = table.Column<int>(nullable: true),
                    WorkspaceId = table.Column<int>(nullable: false),
                    createdBy = table.Column<int>(nullable: true),
                    createdTime = table.Column<DateTime>(nullable: true),
                    deleted = table.Column<bool>(nullable: false),
                    iconCls = table.Column<string>(nullable: true),
                    isPublic = table.Column<bool>(nullable: false),
                    json = table.Column<string>(nullable: true),
                    modifiedBy = table.Column<int>(nullable: true),
                    modifiedTime = table.Column<DateTime>(nullable: true),
                    text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pages", x => x.id);
                    table.ForeignKey(
                        name: "FK_Pages_Pages_Pageid",
                        column: x => x.Pageid,
                        principalTable: "Pages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Pages_Workspaces_WorkspaceId",
                        column: x => x.WorkspaceId,
                        principalTable: "Workspaces",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pages_Pageid",
                table: "Pages",
                column: "Pageid");

            migrationBuilder.CreateIndex(
                name: "IX_Pages_WorkspaceId",
                table: "Pages",
                column: "WorkspaceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pages");

            migrationBuilder.DropColumn(
                name: "startPageId",
                table: "Workspaces");

            migrationBuilder.AddColumn<string>(
                name: "componentTree",
                table: "Workspaces",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "eventHandlers",
                table: "Workspaces",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Workspaceid",
                table: "Group",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_Group_Workspaceid",
                table: "Group",
                column: "Workspaceid");

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
                name: "IX_Nodes_TreeNodeid",
                table: "Nodes",
                column: "TreeNodeid");

            migrationBuilder.CreateIndex(
                name: "IX_Nodes_Workspaceid",
                table: "Nodes",
                column: "Workspaceid");

            migrationBuilder.AddForeignKey(
                name: "FK_Group_Workspaces_Workspaceid",
                table: "Group",
                column: "Workspaceid",
                principalTable: "Workspaces",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
