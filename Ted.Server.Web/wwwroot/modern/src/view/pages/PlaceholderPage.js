Ext.define('Admin.view.pages.PlaceholderPage', {
    extend: 'Ext.Container',
    xtype: 'placeholder',

    requires: [
        'Ext.layout.VBox',
        'Admin.view.pages.WorkspaceCanvasController'
    ],

    "layout": {
        "type": "vbox",
        "pack": "center",
        "align": "center"
    },

    //bodyStyle: 'background-color:red;'

});
