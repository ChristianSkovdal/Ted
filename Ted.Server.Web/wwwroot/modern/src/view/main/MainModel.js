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
        workspaces: {

            model: 'Admin.model.Workspace',

            autoLoad: false,

            proxy: {
                type: 'tedproxy'               
            }
        }
    }
});
