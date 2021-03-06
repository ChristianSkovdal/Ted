Ext.define('Admin.view.pages.WorkspaceListPage', {
    extend: 'Ext.Panel',
    xtype: 'workspacelist',

    requires: [
        'Ext.layout.VBox',
        'Admin.view.pages.WorkspaceListToolbar'
    ],

    layout: 'fit',

    controller: 'main',

    //controller: 'workspaces',
    //viewModel: 'auth',


    //dockedItems: [
    //    {
    //        dock:'top',
    //        xtype: 'workspacestoolbar',
    //        docked: 'top',
    //        userCls: 'main-toolbar',
    //        shadow: true,
    //    },
    //]

    //layout: {
    //    type: 'vbox',
    //    pack: 'center',
    //    align: 'center'
    //},


    listeners: {
        painted: 'onWorkspacesPainted',
        //authenticated: 'onWorkspacesAuthenticated'
    },


    items: [

        {
            xtype: 'workspacestoolbar',
            docked: 'top',
            userCls: 'main-toolbar',
            shadow: true,
        },
        {
            xtype: 'container',
            layout: 'hbox',


            items: [
                {
                    xtype: 'dataview',
                    inline: true,
                    ui: 'default',
                    flex: 2,
                    //style:'background: lightgray;',
                    margin: 10,
                    reference: 'workspaceView',
                    bind: {
                        store: '{workspaces}',
                        selection: '{selectedWorkspace}'
                    },
                    cls: 'dataview-multisort-item',
                    

                    itemTpl: '<div class="dataview-multisort-item">' +
                    '<img draggable="false" src="/images/ws.png" />' +
                    '<div class="name">{name}</div>' +
                    '</div>',

                    listeners: {
                        childdoubletap: 'workspaceDblTap',
                        painted: 'onWorkspaceViewPainted'

                    },

                    plugins: {
                        dataviewtip: {
                            align: 'tl-bl',
                            maxHeight: 200,
                            width: 300,
                            scrollable: 'y',
                            delegate: '.img',
                            allowOver: true,
                            anchor: true,
                            bind: '{record}',
                            cls: 'dataview-multisort-item',
                            //tpl: '<strong>Description</strong>''<div class="info">{description}</div>'
                            //'<strong>Position</strong><div class="info">{position}</div>' +
                            //'<strong>Bio</strong><div class="info">{bio:substr(0, 100)}</div>'
                        }
                    }
                },
                {
                    margin: 30,

                    xtype: 'panel',
                    bind: {
                        html: '<div class="ws-description">About</div>' +
                        '<p>{workspaceInfo.description}</p>' +
                        '<p><strong>Created:</strong> {workspaceInfo.created}</p>'
                    },
                    flex: 1,
                    //bind: {
                    //    hidden: '{!selectedWorkspace}'
                    //},
                }
            ]
        }
    ]
});
