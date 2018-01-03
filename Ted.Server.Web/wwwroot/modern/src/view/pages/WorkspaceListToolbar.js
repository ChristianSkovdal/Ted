Ext.define('Admin.view.pages.WorkspaceListToolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'workspacestoolbar',

    requires: [
        'Ext.Button',
        'Ext.Img',
        'Ext.SegmentedButton'
    ],

    items: [{
        // This component is moved to the floating nav container by the phone profile
        xtype: 'component',
        reference: 'logo',
        userCls: 'main-logo',
        html: 'TED'
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
    {
        ui: 'header',
        iconCls: 'x-fa fa-plus-circle',
        //href: '#edit',
        margin: '0 7 0 0',
        handler: 'addWorkspaceButtonClick',
        text: 'Add',
        width: 100

    },
	{
		ui: 'header',
		iconCls: 'x-fa fa-minus-circle',
		//href: '#edit',
		margin: '0 7 0 0',
		handler: 'deleteWorkspaceButtonClick',
		text: 'Remove',
		bind: {
			disabled: '{!selectedWorkspace}',
		},
		width: 100

	}, {
		ui: 'header',
		iconCls: 'x-fa fa-refresh',
		//href: '#edit',
		margin: '0 7 0 0',
		handler: 'refreshWorkspaceButtonClick',
		text: 'Refresh',
		width: 100

	}, {
		ui: 'header',
		iconCls: 'x-fa fa-check-circle ',
		//href: '#edit',
		margin: '0 7 0 0',
		handler: 'openWorkspaceButtonClick',
		text: 'Open',
		bind: {
			disabled: '{!selectedWorkspace}',
		},
		width: 100

	},
	//'-',
    {
        ui: 'header',
        iconCls: 'x-fa fa-sign-out',
        margin: '0 7 0 0',
        handler: 'signoutButtonClick',
        tooltip: 'Sign out'
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
