﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using Ted.Server.Data;
using Ted.Server.Models;

namespace Ted.Server.Data.Migrations
{
    [DbContext(typeof(TedContext))]
    [Migration("20180103143609_treenode4")]
    partial class treenode4
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Ted.Server.Models.AccessModifier", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("Workspaceid");

                    b.Property<int?>("groupid");

                    b.Property<bool>("isHidden");

                    b.Property<bool>("isProtected");

                    b.Property<bool>("isReadOnly");

                    b.Property<string>("reference");

                    b.HasKey("id");

                    b.HasIndex("Workspaceid");

                    b.HasIndex("groupid");

                    b.ToTable("AccessModifier");
                });

            modelBuilder.Entity("Ted.Server.Models.ComponentModifier", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("Workspaceid");

                    b.Property<int>("action");

                    b.Property<string>("properties");

                    b.Property<string>("reference");

                    b.HasKey("id");

                    b.HasIndex("Workspaceid");

                    b.ToTable("ComponentModifier");
                });

            modelBuilder.Entity("Ted.Server.Models.Group", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("Workspaceid");

                    b.Property<int?>("createdBy");

                    b.Property<DateTime?>("createdTime");

                    b.Property<bool>("deleted");

                    b.Property<string>("description");

                    b.Property<int?>("modifiedBy");

                    b.Property<DateTime?>("modifiedTime");

                    b.Property<string>("name");

                    b.HasKey("id");

                    b.HasIndex("Workspaceid");

                    b.ToTable("Group");
                });

            modelBuilder.Entity("Ted.Server.Models.TreeNode", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("TreeNodeid");

                    b.Property<int?>("Workspaceid");

                    b.Property<int?>("createdBy");

                    b.Property<DateTime?>("createdTime");

                    b.Property<bool>("deleted");

                    b.Property<int?>("modifiedBy");

                    b.Property<DateTime?>("modifiedTime");

                    b.Property<string>("text");

                    b.HasKey("id");

                    b.HasIndex("TreeNodeid");

                    b.HasIndex("Workspaceid");

                    b.ToTable("Nodes");
                });

            modelBuilder.Entity("Ted.Server.Models.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("createdBy");

                    b.Property<DateTime?>("createdTime");

                    b.Property<bool>("deleted");

                    b.Property<string>("email");

                    b.Property<string>("fullName");

                    b.Property<bool>("isSuperUser");

                    b.Property<int?>("modifiedBy");

                    b.Property<DateTime?>("modifiedTime");

                    b.Property<string>("password");

                    b.Property<string>("token");

                    b.Property<string>("workspaceList");

                    b.HasKey("id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Ted.Server.Models.UsersInGroups", b =>
                {
                    b.Property<int>("userId");

                    b.Property<int>("groupId");

                    b.HasKey("userId", "groupId");

                    b.HasIndex("groupId");

                    b.ToTable("UsersInGroups");
                });

            modelBuilder.Entity("Ted.Server.Models.Workspace", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("UserId");

                    b.Property<string>("componentTree");

                    b.Property<int?>("createdBy");

                    b.Property<DateTime?>("createdTime");

                    b.Property<bool>("deleted");

                    b.Property<string>("description");

                    b.Property<string>("eventHandlers");

                    b.Property<int?>("modifiedBy");

                    b.Property<DateTime?>("modifiedTime");

                    b.Property<string>("name");

                    b.HasKey("id");

                    b.HasIndex("UserId");

                    b.ToTable("Workspaces");
                });

            modelBuilder.Entity("Ted.Server.Models.AccessModifier", b =>
                {
                    b.HasOne("Ted.Server.Models.Workspace")
                        .WithMany("access")
                        .HasForeignKey("Workspaceid");

                    b.HasOne("Ted.Server.Models.Group", "group")
                        .WithMany()
                        .HasForeignKey("groupid");
                });

            modelBuilder.Entity("Ted.Server.Models.ComponentModifier", b =>
                {
                    b.HasOne("Ted.Server.Models.Workspace")
                        .WithMany("modifiers")
                        .HasForeignKey("Workspaceid");
                });

            modelBuilder.Entity("Ted.Server.Models.Group", b =>
                {
                    b.HasOne("Ted.Server.Models.Workspace")
                        .WithMany("groups")
                        .HasForeignKey("Workspaceid");
                });

            modelBuilder.Entity("Ted.Server.Models.TreeNode", b =>
                {
                    b.HasOne("Ted.Server.Models.TreeNode")
                        .WithMany("children")
                        .HasForeignKey("TreeNodeid");

                    b.HasOne("Ted.Server.Models.Workspace")
                        .WithMany("nodes")
                        .HasForeignKey("Workspaceid");
                });

            modelBuilder.Entity("Ted.Server.Models.UsersInGroups", b =>
                {
                    b.HasOne("Ted.Server.Models.Group", "group")
                        .WithMany("usersInGroups")
                        .HasForeignKey("groupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Ted.Server.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Ted.Server.Models.Workspace", b =>
                {
                    b.HasOne("Ted.Server.Models.User")
                        .WithMany("myWorkspaces")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
