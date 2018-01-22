Ext.define('Admin.view.controls.TedForm', {
    extend: 'Ext.Panel',
    xtype: 'tedform',

    requires: [
    ],

    hostedItem: true,
    defaults: {
        margin: 10
    },
    
    getSerializableProperties() {
        return ['itemId'];
    },

    getChildren() {
        
        return this.items.items;
    },
    
    config: {
        hostButtons: []
        //    {
        //        text: 'Add',
        //        iconCls: 'x-fa fa-plus',
        //        handler: 'addRow'
        //    },
        //    {
        //        text: 'Edit',
        //        iconCls: 'x-fa fa-pencil',
        //        bind: {
        //            disabled: '{!selected}'
        //        }
        //    },
        //    {
        //        text: 'Delete',
        //        iconCls: 'x-fa fa-minus',
        //        handler: 'deleteRow',
        //        bind: {
        //            disabled: '{!selected}'
        //        }
        //    },
        //    {
        //        text: 'Refresh',
        //        iconCls: 'x-fa fa-refresh',
        //        handler: 'reload'
        //    },
        //]
    },


});
