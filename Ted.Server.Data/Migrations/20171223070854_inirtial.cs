using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Ted.Server.Data.Migrations
{
    public partial class inirtial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workspaces_Users_Userid",
                table: "Workspaces");

            migrationBuilder.DropIndex(
                name: "IX_Workspaces_Userid",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "Userid",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "componentModifiers",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "createdBy",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "modifiedBy",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "securityGroups",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "createdBy",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "modifiedBy",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "createdBy",
                table: "Group");

            migrationBuilder.DropColumn(
                name: "modifiedBy",
                table: "Group");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Group_Workspaces_Workspaceid",
                table: "Group",
                column: "Workspaceid",
                principalTable: "Workspaces",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Group_Workspaces_Workspaceid",
                table: "Group");

            migrationBuilder.DropTable(
                name: "AccessModifier");

            migrationBuilder.DropTable(
                name: "ComponentModifier");

            migrationBuilder.DropIndex(
                name: "IX_Group_Workspaceid",
                table: "Group");

            migrationBuilder.DropColumn(
                name: "Workspaceid",
                table: "Group");

            migrationBuilder.AddColumn<int>(
                name: "Userid",
                table: "Workspaces",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "componentModifiers",
                table: "Workspaces",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "createdBy",
                table: "Workspaces",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "modifiedBy",
                table: "Workspaces",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "securityGroups",
                table: "Workspaces",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "createdBy",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "modifiedBy",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "createdBy",
                table: "Group",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "modifiedBy",
                table: "Group",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Workspaces_Userid",
                table: "Workspaces",
                column: "Userid");

            migrationBuilder.AddForeignKey(
                name: "FK_Workspaces_Users_Userid",
                table: "Workspaces",
                column: "Userid",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
