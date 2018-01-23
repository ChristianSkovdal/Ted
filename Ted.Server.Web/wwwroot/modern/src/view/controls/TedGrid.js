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

    getMasterTableId() {
        return this.getParent().getMasterTableId();
    },

    listeners: {
        specialkey: function () {
            debugger;
        }
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

    getFields() {
        return this.getColumns().map(r => {
            return {
                type: r.dataType || r._dataType,
                name: r.getDataIndex()
            }
        });
    },

    
    getHostButtons() {

        let buttons = [
            {
                text: 'Add',
                iconCls: 'x-fa fa-plus',
                handler: 'addRow'
            },
            //{
            //    text: 'Edit',
            //    iconCls: 'x-fa fa-pencil',
            //    bind: {
            //        disabled: '{!selected}'
            //    }
            //},
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
            }
        ];

        if (this.getMasterTableId()) {
            buttons.push({
                text: 'Show All',
                iconCls: 'x-fa fa-eye',
                handler: 'showAll'
            });
        }

        return buttons;
    }
    


});
