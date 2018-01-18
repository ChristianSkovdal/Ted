Ext.define('Admin.view.controls.TedGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'tedgrid',

    requires: [
        'Admin.view.controls.TedGridController'
    ],

    hostedItem: true,

    controller: 'tedgrid',
    viewModel: 'teddatapanel',

    listeners: {
        //initialize: function () {
        //    
        //}
    },

    bind: {
        selection: '{selectedItem}',
        store: '{datasrc}'
    },

    getSerializableProperties() {
        return ['itemId'];
    },

    getChildren() {
        return this.getColumns();
    },

    getColumnDefinitions() {
        return this.getColumns().map(r => {
            return {
                type: r.dataType || r._dataType,
                name: r.getDataIndex()
            }
        });
    },

    config: {
        hostButtons: [
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
                iconCls: 'x-fa fa-minus',
                handler: 'deleteRow'
            },
            {
                text: 'Refresh',
                iconCls: 'x-fa fa-refresh',
                handler: 'reload'
            },
        ]
    },


});
