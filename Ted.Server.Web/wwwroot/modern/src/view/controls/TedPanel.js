Ext.define('Admin.view.controls.TedPanel', {
    extend: 'Ext.Panel',
    xtype: 'tedpanel',

    minHeight: 200,
    ui: 'light',

    requires: [
        'Admin.view.controls.TedPanelController',
        'Admin.view.controls.TedPanelModel',
        'Admin.view.controls.TedColumn',
        'Aux.Util'

    ],

    getSerializableProperties() {

        return ['title'];

    },


    controller: 'tedpanel',
    viewModel: 'tedpanel',

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
