Ext.define('Admin.view.main.Toolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'maintoolbar',

    requires: [
        'Ext.Button',
        'Ext.Img',
        //'Ext.SegmentedButton'
    ],

    items: [{
        // This component is moved to the floating nav container by the phone profile
        xtype: 'component',
        reference: 'logo',
        userCls: 'main-logo',
        bind: {
            html: 'TED - {workspace.name}'
        }
    }, {
        ui: 'header',
        iconCls: 'x-fa fa-bars',
        margin: '0 0 0 10',
        listeners: {
            tap: 'onToggleNavigationSize'
        }
    },
        '->',
    /*
{
    xtype: 'segmentedbutton',
    reference: 'toolkitSwitch',
    margin: '0 16 0 0',
    platformConfig: {
        phone: {
            hidden: true
        }
    },
    items: [{
        width: 35,
        value: 'classic',
        iconCls: 'x-fa fa-desktop',
        handler: 'onSwitchToClassic'
    }, {
        value: 'modern',
        iconCls: 'x-fa fa-tablet',
        pressed: true
    }]
},
    */
    //{
    //    //ui: 'header',
    //    iconCls: 'x-fa fa-calendar-plus-o',
    //    //href: '#edit',
    //    margin: '0 7 0 0',
    //    handler: 'addPageButtonClick',
    //    text: 'New Page',
    //    bind: {
    //        hidden: '{!editMode}'
    //    }
    //},
    //      {
    //          //ui: 'header',
    //          iconCls: 'x-fa fa-edit',
    //          href: '#edit',
    //          margin: '0 7 0 0',
    //          handler: 'editButtonClick',
    //          text: 'Author',
    //          bind: {
    //              pressed: '{editMode}'
    //          }
    //},
    {
        iconCls: 'x-fa fa-th',
        margin: '0 7 0 0',
        handler: '',
        text: 'Grid',
        handler: 'addGridButtonClick',
    },


    {
        iconCls: 'x-fa fa-plus-circle',
        toolTip: 'New',

        menu: {
            plain: true,

            items: [
                {
                    iconCls: 'x-fa fa-calendar-plus-o',
                    margin: '0 7 0 0',
                    handler: '',
                    text: 'Page',
                    handler: 'addPageButtonClick',
                },
                {
                    iconCls: 'x-fa fa-th',
                    margin: '0 7 0 0',
                    handler: '',
                    text: 'Grid',
                    handler: 'addGridButtonClick',
                },
                {
                    iconCls: 'fa-sticky-note-o',
                    margin: '0 7 0 0',
                    handler: '',
                    text: 'Canvas',
                }

            ]
        }
    },
    {
        iconCls: 'x-fa fa-gg',
        toolTip: 'Main menu',

        menu: {
            plain: true,

            items: [
                {
                    iconCls: 'x-fa fa-user',
                    margin: '0 7 0 0',
                    handler: '',
                    text: 'Profile',
                },
                {
                    iconCls: 'x-fa fa-cog',
                    margin: '0 7 0 0',
                    handler: '',
                    text: 'Workspace Settings',
                },
                '-',
                {
                    iconCls: 'x-fa fa-cube',
                    margin: '0 7 0 0',
                    handler: 'gotoWorkspacesButtonClick',
                    text: 'Workspaces',
                },
                {
                    iconCls: 'x-fa fa-sign-out',
                    margin: '0 7 0 0',
                    handler: 'signoutButtonClick',
                    text: 'Sign out',
                }
            ]
        }

    }


        /*
        , {
        ui: 'header',
        iconCls: 'x-fa fa-envelope',
        href: '#email',
        margin: '0 7 0 0',
        handler: 'toolbarButtonClick'
    }, {
        ui: 'header',
        iconCls: 'x-fa fa-question',
        href: '#faq',
        margin: '0 7 0 0',
        handler: 'toolbarButtonClick'
    }, {
        ui: 'header',
        iconCls: 'x-fa fa-th-large',
        href: '#dashboard',
        margin: '0 7 0 0',
        handler: 'toolbarButtonClick'
    }, {
        xtype: 'component',
        html: 'Goff Smith',
        margin: '0 12 0 4',
        userCls: 'main-user-name'
    }, {
        xtype: 'image',
        userCls: 'main-user-image small-image circular',
        alt: 'Current user image',
        src: '<shared>/images/user-profile/2.png'
    }*/
    ]
});
