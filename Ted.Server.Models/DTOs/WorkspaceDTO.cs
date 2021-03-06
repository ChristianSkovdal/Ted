﻿using System.Collections.Generic;

namespace Ted.Server.Models
{
    public class WorkspaceDTO : BaseEntity
    {
        public WorkspaceDTO()
        {

        }
        public WorkspaceDTO(Workspace workspace)
        {
            id = workspace.id;
            createdBy = workspace.createdBy;
            createdTime = workspace.createdTime;
            modifiedBy = workspace.modifiedBy;
            description = workspace.description;
            modifiedTime = workspace.modifiedTime;
            name = workspace.name;
			deleted = workspace.deleted;
			componentTree = workspace.componentTree;
        }

		public string name { get; set; }	

		public string description { get; set; }

		public string componentTree { get; set; }

	}
}
