Ext.define('Admin.view.pages.WorkspaceCanvas', {
    extend: 'Ext.Container',
    xtype: 'workspacecanvas',

    requires: [
        'Ext.layout.VBox',
        'Admin.view.pages.WorkspaceCanvasController'
    ],

    controller: 'workspacecanvas',

    //bbar: [
    //    '->',
    //    {
    //        text: 'cdasfad',
    //        iconCls: 'x-fa fa-plus',
    //    }
    //],

    //cls: 'blank-page-container',

    //items: [
    //    {
    //        xtype: 'toolbar',
    //        docked: 'top',
    //        userCls: 'main-toolbar',
    //        shadow: true,
    //        bind: {
    //            hidden: '{!showWorkspaceTools}'
    //        },

    //        items: [{
    //            ui: 'header',
    //            iconCls: 'x-fa fa-bars',
    //            margin: '0 0 0 10',
    //            text: 'dsadfas',
    //            listeners: {
    //                tap: 'onToggleNavigationSize'
    //            }
    //        },
    //        {
    //            ui: 'header',
    //            text: 'dsadfas',
    //            iconCls: 'x-fa fa-bars',
    //            margin: '0 0 0 10',
    //            listeners: {
    //                tap: 'onToggleNavigationSize'
    //            }
    //        },
    //        ]
    //    }
    //]
});
