Ext.define('Admin.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        editMode: true,
        ready: false,
        user: null,

        email: '',
        password: '',
        fullname: '',
		rememberMe: false,

		selectedWorkspace: null,
		workspace: null
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
			return ws == null;
		}
	},

    stores: {
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
					writeRecordId:false,
					writeAllFields: false
				},
                listeners: {
                    exception: function (proxy, response, operation) {
                        let msg = 'Unknown Error';
                        if (response && response.responseText) {
                            var errObj = JSON.parse(response.responseText);
                            if (errObj && !errObj.success && errObj.message) {
                                msg=errObj.message;
                            }
                            else {
                                msg = resp.responseText;
                            }
                        }
                        else if (operation && operation.error) {
                            msg = 'Error Code '+operation.error.status+' '+operation.error.statusText;
                        }

                        Ext.Msg.alert('Data Error', msg);
                    }
                }
            }
        },
    }
});
