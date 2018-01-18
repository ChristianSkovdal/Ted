Ext.define('Admin.view.controls.TedGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'tedgrid',

    requires: [
        'Admin.view.controls.TedGridController',
    ],

    hostedItem: true,

    controller: 'tedgrid',

    plugins: [{
        type: 'cellediting'
    }],

    listeners: {
        //initialize: function () {
        //    
        //}
    },

    bind: {
        selection: '{selected}',
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
                iconCls: 'x-fa fa-pencil',
                bind: {
                    disabled: '{!selected}'
                }
            },
            {
                text: 'Delete',
                iconCls: 'x-fa fa-minus',
                handler: 'deleteRow',
                bind: {
                    disabled: '{!selected}'
                }
            },
            {
                text: 'Refresh',
                iconCls: 'x-fa fa-refresh',
                handler: 'reload'
            },
        ]
    },


});
