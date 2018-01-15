Ext.define('Admin.view.controls.TedGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'tedgrid',

    requires: [
        'Admin.view.controls.TedGridController'
    ],

    hostedItem: true,

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
        ]
    },

    //getStore() {

    //    //let fields = [];
    //    //grid.getColumns().forEach(col => {

    //    //    fields.push({
    //    //        type: col._dataType || col.dataType,
    //    //        name: col._dataIndex || col.dataIndex
    //    //    });
    //    //});
    //    debugger;

    //    if (!this.callParent(arguments)) {

    //        let vm = this.getViewModel();
    //        let store = Ext.create('Ext.data.Store', {

    //            //fields: fields,
    //            autoLoad: false,
    //            model: 'Admin.model.FlexRow',

    //            proxy: {
    //                url: 'api/data/' + vm.get('user').token + '/' + this._itemId,
    //                type: 'tedproxy'
    //            }
    //        });

    //        this.setStore(store);
    //    }
    //    return this.callParent(arguments);

    //}


});
