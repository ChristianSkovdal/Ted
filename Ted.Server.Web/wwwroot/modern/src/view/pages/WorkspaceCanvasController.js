Ext.define('Admin.view.pages.WorkspaceCanvasController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workspacecanvas',

    requires: [
        'Ext.MessageBox'
    ],

    control: {
        '*': {
            painted: function (cmp) {
                //debugger;
            }
        }
    },
});
