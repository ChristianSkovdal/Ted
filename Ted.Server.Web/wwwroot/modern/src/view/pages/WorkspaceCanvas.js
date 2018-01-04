Ext.define('Admin.view.pages.WorkspaceCanvas', {
    extend: 'Ext.Container',
    xtype: 'workspacecanvas',

    requires: [
		'Ext.layout.VBox',
		'Admin.view.pages.WorkspaceCanvasController'
    ],

    controller: 'workspacecanvas',


});
