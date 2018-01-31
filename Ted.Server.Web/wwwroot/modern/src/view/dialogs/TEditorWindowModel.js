Ext.define('Admin.view.dialogs.TEditorWindowModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.teditor',

    data: {
        selectedModule: null,
        module: {
            name: 'MyModule'
        }
    },

    stores: {
        modules: {

            fields: ['name', 'code'],

            autoLoad: false,

            proxy: {
                type: 'tedproxy'
            }
        }
    }
    
});
