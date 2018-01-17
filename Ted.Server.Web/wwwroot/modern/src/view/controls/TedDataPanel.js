Ext.define('Admin.view.controls.TedDataPanel', {
    extend: 'Ext.Panel',
    xtype: 'teddatapanel',

    layout: 'card',
    bodyStyle:'background:green;',
    //minHeight: 200,
    ui: 'light',

    requires: [
        'Admin.view.controls.TedDataPanelController',
        'Admin.view.controls.TedDataPanelModel',
        //'Admin.view.columns.TedColumn',
        'Aux.Util'

    ],

    listeners: {
        initialize: 'initialize'
    },

    getSerializableProperties() {
        return ['title', 'itemId', 'dataSourceId'];
    },

    getChildren() {
        return this.items.items;
    },

    getFields() {
        this.down('grid').getColumnDefinitions();
    },

    controller: 'teddatapanel',
    viewModel: 'teddatapanel',

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
