Ext.define('Admin.view.dialogs.TEditorWindow', {
    extend: 'Ext.Dialog',
    xtype: 'teditor',

    title: 'TEDITOR',

    controller: 'teditor',
    viewModel: 'teditor',

    requires: [
        'Ext.panel.Resizer',
        'Ext.Toolbar'
    ],

    modal: false,
    closable: true,
    maximizable: true,
    height: 500,
    width: 700,
    resizeable: true,
    border: true,
    resizable: {
        edges: 'all'
    },
    layout: 'card',

    items: [
        {
            xtype: 'container',
            items: [
                {
                    docked: 'top',
                    xtype: 'toolbar',
                    items: [
                        {
                            ui: 'header',
                            iconCls: 'x-fa fa-plus-circle',
                            //href: '#edit',
                            margin: '0 7 0 0',
                            handler: 'addButtonClick',
                            text: 'Add',

                        },
                        {
                            ui: 'header',
                            iconCls: 'x-fa fa-minus-circle',
                            //href: '#edit',
                            margin: '0 7 0 0',
                            handler: 'deleteButtonClick',
                            text: 'Remove',
                            bind: {
                                disabled: '{!selectedModule}',
                            },

                        }, {
                            ui: 'header',
                            iconCls: 'x-fa fa-refresh',
                            //href: '#edit',
                            margin: '0 7 0 0',
                            handler: 'refreshButtonClick',
                            text: 'Refresh',

                        }, {
                            ui: 'header',
                            iconCls: 'x-fa fa-check-circle ',
                            //href: '#edit',
                            margin: '0 7 0 0',
                            handler: 'openButtonClick',
                            text: 'Open',
                            bind: {
                                disabled: '{!selectedModule}',
                            },

                        }
                    ]
                },
                {
                    xtype: 'dataview',
                    inline: true,
                    emptyText: 'No <b>modules</b> yet.<br/>Click "Add" to begin',
                    ui: 'default',
                    //style:'background: lightgray;',
                    reference: 'moduleView',
                    bind: {
                        store: '{modules}',
                        selection: '{selectedModule}'
                    },
                    cls: 'teditor-multisort-item',

                    itemTpl: '<div class="teditor-multisort-item">' +
                    '<img draggable="false" src="/images/module.png" />' +
                    '<div class="name">{name}</div>' +
                    '</div>',

                    listeners: {
                        childdoubletap: 'moduleDblTap',
                        painted: 'onModuleViewPainted'

                    },
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyStyle: 'background: blue;',


            items: [

                {
                    xtype: 'toolbar',
                    docked: 'top',

                    items: [
                        //{
                        //    ui: 'header',
                        //    iconCls: 'x-fa fa-plus-circle',
                        //    margin: '0 7 0 0',
                        //    handler: 'saveButtonClick',
                        //    text: 'Save',
                        //},
                        {
                            ui: 'header',
                            iconCls: 'x-fa fa-play',
                            margin: '0 7 0 0',
                            handler: 'playButtonClick',
                            text: 'Play',
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    docked: 'left',
                    minWidth: 200,
                    width: 450,
                    flex:2,
                    resizable: {
                        split: true,
                        edges: 'east'
                    },
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'jseditor',
                            reference: 'js',

                        }
                    ]

                },                
                {
                    xtype: 'panel',
                    reference: 'player',
                    minWidth: 200,
                    flex: 1,
                    layout: 'fit',
                    margin: 10,
                    bodyStyle: 'background: lightgray;'

                }
            ]

        }
    ]

});
