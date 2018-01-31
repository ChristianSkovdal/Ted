Ext.define('Admin.view.controls.PanelHost', {
    extend: 'Ext.Panel',
    xtype: 'panelhost',

    layout: 'card',
    //bodyStyle:'background:green;',
    ui: 'light',

    viewModel: 'panelhost',
    controller: 'panelhost',

    requires: [
        'Admin.view.controls.PanelHostController',
        'Admin.view.controls.PanelHostModel',
        'Admin.view.controls.TedForm',
        'Aux.Util'
    ],

    getSerializableProperties() {
        return ['title', 'itemId', 'dataSourceId', 'masterTableId'];
    },

    
    getMasterTableId() {
        return this.masterTableId;
    },
    
    getChildren() {
        return this.items.items;
    },

    getFields() {
        return this.down('component[getFields]').getFields();
    },

    setStore(store) {
        let child = this.down('component[setStore]');
        child.setStore(store);
    },

    getClient() {
        return this.downsafe('container[hostedItem=true]');
    },

    tbar: [
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
        {
            type: 'plus',
            handler: 'onAddSomething'
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
