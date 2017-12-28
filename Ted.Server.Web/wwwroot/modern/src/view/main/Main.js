Ext.define('Admin.view.main.Main', {
    extend: 'Ext.navigation.View',

    requires: [
        'Ext.Button',
        'Ext.list.Tree',
        'Ext.navigation.View'
    ],

    controller: 'main',
    viewModel: 'main',

    navigationBar: false,
    userCls: 'main-container',

    platformConfig: {
        phone: {
            controller: 'phone-main'
        }
    },

    items: [{
        xtype: 'maintoolbar',
        docked: 'top',
        userCls: 'main-toolbar',
        shadow: true
    }, {
        xtype: 'container',
        docked: 'left',
        userCls: 'main-nav-container',
        reference: 'navigation',
        layout: 'fit',

       
        
        items: [{
            xtype: 'container',
            layout: 'fit',
            //title:'ffdsfdsf',
            margin:10,

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    //reference: 'editTreeToolbar',
                    visible: true,
                    hidden: false,
                    height: 30,
                    //hidden: false,
                    //bind: {
                    //    hidden: '{editMode}'
                    //},
                    items: [
                        {
                            xtype: 'button',
                            text: '+',
                        }
                    ]
                }
            ],

            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTree',
                    scrollable: true,
                    ui: 'nav',
                    store: 'NavigationTree',
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        itemclick: 'onNavigationItemClick',
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                }
            ]
        }]
    }]
});
