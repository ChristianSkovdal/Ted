Ext.define('Admin.view.main.MainModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.main',

    data: {

        // Show tols for authoring etc.
        editMode: true,

        // The currently logged in user
		user: null,

        // Login information.
		email: '',
		password: '',
		fullname: '',
		rememberMe: false,

        // The workspace selected in the workspace list
        selectedWorkspace: null,

        // The currently open workspace
        workspace: null,

        // Show navigator and toolbars i workspace
        showWorkspaceTools: false
	},

	formulas: {
		workspaceInfo: function (get) {
			let ws = get('selectedWorkspace');
			if (ws)
				return {
					description: ws.data.description,
					created: ws.data.createdTime
				};
		},
		noSelection(get) {
			let ws = get('selectedWorkspace');
			return ws === null;
		}
	},

	stores: {
		//navtree: {


		//	storeId: 'NavigationTree',

		//	fields: [{
		//		name: 'text'
		//	}],

		//	root: {
		//		expanded: true,
		//		children: [
		//			{
		//				text: 'Dashboard',
		//				iconCls: 'x-fa fa-desktop',
		//				rowCls: 'nav-tree-badge nav-tree-badge-new',
		//				viewType: 'admindashboard',
		//				routeId: 'dashboard', // routeId defaults to viewType
		//				leaf: true
		//			},
		//			{
		//				text: 'Email',
		//				iconCls: 'x-fa fa-send',
		//				rowCls: 'nav-tree-badge nav-tree-badge-hot',
		//				viewType: 'email',
		//				leaf: true
		//			}
		//		]
		//	}
		//},

			workspaces: {

			model: 'Admin.model.Workspace',

			autoLoad: false,
			proxy: {
				type: 'rest',
				appendId: true,

				reader: {
					type: 'json',
					rootProperty: 'data'
				},
				writer: {
					type: 'json',
					writeRecordId: false,
					writeAllFields: false
				},
				listeners: {
					exception: function (proxy, response, operation) {
						let msg = 'Unknown Error';
						if (response && response.responseText) {
							var errObj = JSON.parse(response.responseText);
							if (errObj && !errObj.success && errObj.message) {
								msg = errObj.message;
							}
							else {
								msg = resp.responseText;
							}
						}
						else if (operation && operation.error) {
							msg = 'Error Code ' + operation.error.status + ' ' + operation.error.statusText;
						}

						Ext.Msg.alert('Data Error', msg);
					}
				}
			}
		},
	}
});
