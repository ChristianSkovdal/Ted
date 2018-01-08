Ext.define('Admin.view.controls.FlexiGrid', {
    extend: 'Ext.Panel',
    xtype: 'flexigrid',

    minHeight: 100,
    ui: 'light',

    requires: [
        'Admin.view.controls.FlexiGridController',
        'Admin.view.controls.FlexiGridModel'

    ],


    controller: 'flexigrid',
    viewModel: 'flexigrid',

    tools: [
        {
            type: 'gear',
            handler: 'onSettings'
        },
        {
            type: 'down',
            handler: 'onDown'
        },
        {
            type: 'up',
            handler: 'onUp'
        },
        {
            //itemId: 'refresh',
            type: 'refresh',
            //hidden: true,
            handler: 'onRefresh'
        },
        {
            //itemId: 'refresh',
            type: 'plus',
            //hidden: true,
            handler: 'onAdd'
        },
        //{
        //    type: 'search',
        //    handler: 'onSearch'
        //}
    ],

    items: [
        {
            xtype: 'grid'
        }
    ]

});
