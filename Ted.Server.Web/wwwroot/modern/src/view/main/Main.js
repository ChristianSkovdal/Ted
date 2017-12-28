Ext.define('Admin.view.main.Main', {
    extend: 'Ext.navigation.View',

    requires: [
        'Ext.Button',
        'Ext.list.Tree',
        'Ext.navigation.View',
        'Admin.view.pages.TedPage',
        'Admin.view.pages.WorkspacesPage'
        //'Admin.view.authentication.Login',
        //'Admin.view.authentication.Register'
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

    items: [
        {
            xtype: 'maintoolbar',
            docked: 'top',
            userCls: 'main-toolbar',
            shadow: true,
            bind: {
                hidden: '{!ready}'
            },

        },
        //{
        //    xtype: 'login',
        //    bind: {
        //        hidden: '{authenticated}'
        //    },
        //},
        {
            xtype: 'container',
            docked: 'left',
            userCls: 'main-nav-container',
            reference: 'navigation',
            layout: 'fit',
            bind: {
                hidden: '{!ready}'
            },
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTree',
                    scrollable: true,
                    ui: 'nav',
                    store: 'NavigationTree',
                    expanderFirst: false,
                    expaderOnly: false,
                    listeners: {
                        itemclick: 'onNavigationItemClick',
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                }
            ]
        }
    ]
});
