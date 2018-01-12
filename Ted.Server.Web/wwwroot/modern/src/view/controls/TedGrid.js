Ext.define('Admin.view.controls.TedGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'tedgrid',

    requires: [
        'Admin.view.controls.TedGridController'
    ],

    hostedItem:true,

    controller: 'tedgrid',
 
    getSerializableProperties() {
        return ['itemId'];
    },

    getChildren() {
        return this.getColumns();
    },

    
    config: {
        buttons: [
            {
                text: 'Add',
                iconCls: 'x-fa fa-plus',
                handler: 'addRow'
            },
            {
                text: 'Edit',
                iconCls: 'x-fa fa-pencil'
            },
            {
                text: 'Delete',
                iconCls: 'x-fa fa-minus'
            },
            {
                text: 'Refresh',
                iconCls: 'x-fa fa-refresh'
            },
        ],
    }
 
});
