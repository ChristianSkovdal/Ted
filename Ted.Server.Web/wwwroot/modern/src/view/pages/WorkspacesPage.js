Ext.define('Admin.view.pages.WorkspacesPage', {
    extend: 'Ext.Panel',
    xtype: 'workspacespage',

    requires: [
        'Ext.layout.VBox',
        'Admin.view.pages.WorkspacesToolbar'
    ],

    layout: 'fit',

    controller: 'main',

    //controller: 'workspaces',
    //viewModel: 'auth',


    //dockedItems: [
    //    {
    //        dock:'top',
    //        xtype: 'workspacestoolbar',
    //        docked: 'top',
    //        userCls: 'main-toolbar',
    //        shadow: true,
    //    },
    //]

    //layout: {
    //    type: 'vbox',
    //    pack: 'center',
    //    align: 'center'
    //},


    listeners: {
        show: 'onWorkspacesShow',
        authenticated: 'onWorkspacesAuthenticated'
    },


    items: [

        {
            xtype: 'workspacestoolbar',
            docked: 'top',
            userCls: 'main-toolbar',
            shadow: true,
        },
        {
            xtype: 'dataview',
            style: 'background-color:lightblue;',
            reference: 'workspaceView',
            bind: {
                store: '{workspaces}'
			},
			itemTpl: '<div>WS: {name}</div>'
        }
    ]
});
