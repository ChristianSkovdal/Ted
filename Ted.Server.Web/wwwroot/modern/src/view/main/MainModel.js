Ext.define('Admin.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        editMode: true,
        ready: false,
        token: '',

        email: '',
        password: '',
        fullname: '',
        rememberMe: false
    },

    stores: {
        workspaces: {

            model: 'Admin.model.Workspace',

            autoLoad: false,
            proxy: {
                type: 'ajax',
                //api: {
                //    read: 'api/workspace/' + this.data.token
                //},
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
    }
});
