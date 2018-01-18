Ext.define('Admin.view.controls.TedDataPanel', {
    extend: 'Ext.Panel',
    xtype: 'teddatapanel',

    layout: 'card',
    bodyStyle:'background:green;',
    //minHeight: 200,
    ui: 'light',
    //defaultListenerScope: true,

    viewModel: 'teddatapanel',
    controller: 'teddatapanel',

    requires: [
        'Admin.view.controls.TedDataPanelController',
        'Admin.view.controls.TedDataPanelModel',
        //'Admin.view.columns.TedColumn',
        'Aux.Util'

    ],

    getSerializableProperties() {
        return ['title', 'itemId', 'dataSourceId'];
    },

    getChildren() {
        return this.items.items;
    },

    getFields() {
        return this.down('grid').getColumnDefinitions();
    },

    tbar: [
        //{
        //    text: 'Some button'
        //}
    ],

    tools: [
        {
            type: 'gear',
            handler: 'onSettings'
        },
        {
            type: 'minus',
            handler: 'onRemove'
        },
        //{
        //    type: 'down',
        //    handler: 'onDown'
        //},
        //{
        //    type: 'up',
        //    handler: 'onUp'
        //},
        //{
        //    //itemId: 'refresh',
        //    type: 'refresh',
        //    //hidden: true,
        //    handler: 'onRefresh'
        //},
        //{
        //    //itemId: 'refresh',
        //    type: 'plus',
        //    //hidden: true,
        //    handler: 'onAdd'
        //},
        //{
        //    type: 'search',
        //    handler: 'onSearch'
        //}
    ],



});
