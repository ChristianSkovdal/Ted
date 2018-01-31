Ext.define('Admin.view.controls.TedStringColumn', {
    extend: 'Ext.grid.column.Column',
    xtype: 'tedstringcolumn',

    renderer: 'textCellRenderer'
});

Ext.define('Admin.view.controls.TedNumberColumn', {
    extend: 'Ext.grid.column.Number',
    xtype: 'tedintcolumn',

    format: "0,000",

    editor: {
        xtype: 'spinnerfield'
    },

});

Ext.define('Admin.view.controls.TedBooleanColumn', {
    extend: 'Ext.grid.column.Boolean',
    xtype: 'tedbooleancolumn',


});

Ext.define('Admin.view.controls.TedDateColumn', {
    extend: 'Ext.grid.column.Date',
    xtype: 'teddatecolumn'

    //format: 'd-Y-m'
    //renderer: 'myrender'
});

Ext.define('Admin.view.controls.PictureCellEditor', {
    extend: 'Ext.grid.CellEditor',
    xtype: 'picturepicker',

    controller: 'tedgrid',
    

    requires: [
        'Admin.view.controls.FileUploadButton'
    ],

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',

            defaults: {                
                margin: '-10 0 0 0'
            },

            items: [
                {
                    xtype: 'container',
                    align: 'left',
                    flex: 4,
                    listeners: {
                        painted: function () {
                            var val = this.upsafe('editor').getValue();
                            if (val) {
                                let obj = JSON.parse(val);
                                this.setHtml(obj.name);
                            }
                        }
                    }
                },
                {
                    iconCls: 'x-fa fa-arrow-circle-o-up',
                    minWidth: 35,
                    flex: 1,
                    xtype: 'fileuploadbutton',
                    text: 'Upload',
                    accept: "image/*",
                    align: 'right',                    
                },
                {
                    iconCls: 'x-fa fa-trash-o',
                    minWidth: 35,
                    flex: 1,
                    xtype: 'button',
                    text: 'Delete',
                    handler: 'deleteFileButtonClick',
                    align: 'right',
                }
            ]
        }

    ],

    listeners: {
        initialize: function (cmp) {
            this.originalTextField = cmp.items.items[cmp.items.items.length - 1];
            this.originalTextField.hide();
        },
        specialKey: function () {
            debugger;
        }
    },

    getValue(value) {
        return this.originalTextField.getValue();
    }

});


Ext.define('Admin.view.controls.TedPictureColumn', {
    extend: 'Ext.grid.column.Column',
    xtype: 'tedpicturecolumn',

    editor: {
        xtype: 'picturepicker',
    },

    cell: {
        xtype: 'gridcell',
        encodeHtml: false,
        //align: 'center'
    },

    renderer: 'pictureCellRenderer'

});

Ext.define('Admin.view.controls.TedImportColumn', {
    extend: 'Ext.grid.column.Column',
    xtype: 'importcolumn',

    flex: 1,
    getMenu() {

        let me = this;
        let menu = this.callParent(arguments);

        menu.on('beforeshow', menu => {

            menu.items.items.forEach(m => {
                if (!m.addedMenuItem)
                    m.hide();
            });

            addIfNeeded = function (m, i) {
                if (!m.down('#' + i.itemId)) {
                    i.addedMenuItem = true;
                    m.add(i);
                }
            };


            addIfNeeded(menu, {
                text: 'Ignore',
                itemId: 'column-ignore',
                group: 'itemGroup'
                //iconCls: Ext.baseCSSPrefix + 'headermenu-sort-asc'
            });
            addIfNeeded(menu, {
                text: 'Create',
                itemId: 'column-create',
                group: 'itemGroup',
                checked: true

            });
            addIfNeeded(menu, {
                xtype: 'menuseparator'
            });
            assert(me.up('dialog').destinationGrid);
            for (let col of me.up('dialog').destinationGrid.getColumns()) {
                if (col.getDataIndex() !== 'id') {
                    addIfNeeded(menu, {
                        text: col.getText(),
                        itemId: col.getDataIndex(),
                        group: 'itemGroup'
                    });
                }
            }

            return true;
        });

        return menu;
    }
});


Ext.define('Admin.view.controls.TedColumnInitializer', {}, () => {

    var props = {

        //requires: [
        //    'Ext.grid.plugin.CellEditing',
        //    'Ext.grid.plugin.Editable'
        //],

        //platformConfig: {
        //    desktop: {
        //        plugins: {
        //            gridcellediting: true
        //        }
        //    },

        //    '!desktop': {
        //        plugins: {
        //            grideditable: true
        //        }
        //    }
        //},

        editable: true,

        getSerializableProperties() {
            return ['text', 'flex', 'itemId', 'dataType', 'dataIndex', '.editor', 'renderer', 'scriptCode'];
        },

        getEditorConfig() {
            let e = this.getEditor();
            if (e) {
                let obj = {
                    xtype: e.xtype,
                    name: e.name
                };
                if (e.xtype === 'selectfield' && e._options) {
                    obj.options = e._options.data.items.map(r => r.data.text);
                }
                else if (e.xtype === 'gridcellcombo') {

                    assert(cmp.dataSourceId);
                    assert(cmp.columnName);

                    obj.itemTpl = e.itemTpl;
                    obj.displayTpl = e.displayTpl;
                    obj.dataSourceId = e.dataSourceId;
                    obj.columnName = e.columnName;

                }
                return obj;
            }
        },


        getMenu() {
            let menu = this.callParent(arguments);

            menu.on('beforeshow', menu => {

                menu.items.items.forEach(m => {
                    if (!m.addedMenuItem)
                        m.hide();
                });

                addIfNeeded = function (m, i) {
                    if (!m.down('#' + i.itemId)) {
                        i.addedMenuItem = true;
                        m.add(i);
                    }
                };

                //menu.add({
                //    xtype: 'menuseparator'
                //});
                addIfNeeded(menu, {
                    text: 'Add Column',
                    iconCls: 'x-fa fa-plus',
                    itemId: 'column-add',

                    menu: [
                        {
                            text: 'Text',
                            handler: 'addColumn',
                            dataType: 'string',
                            columnXType: 'tedstringcolumn'
                        },
                        {
                            text: 'Number',
                            handler: 'addColumn',
                            dataType: 'int',
                            columnXType: 'tedintcolumn'
                        },
                        {
                            text: 'Date',
                            handler: 'addColumn',
                            dataType: 'date',
                            columnXType: 'teddatecolumn'
                        },
                        {
                            text: 'Yes/No',
                            handler: 'addColumn',
                            dataType: 'boolean',
                            columnXType: 'tedbooleancolumn'
                        },
                        {
                            text: 'Picture',
                            handler: 'addColumn',
                            dataType: 'string',
                            columnXType: 'tedpicturecolumn'
                        }
                        //{
                        //    text: 'Select',
                        //    handler: 'addColumn',
                        //    columnXType: 'string',
                        //    editor: 'tedselectcolumn'
                        //},
                    ]
                });

                addIfNeeded(menu, {
                    text: 'Settings',
                    handler: 'columnSettings',
                    iconCls: 'x-fa fa-cog',
                    itemId: 'column-settings'
                });


                return true;
            });



            return menu;
        }
    };

    Ext.override(Admin.view.controls.TedStringColumn, props);
    Ext.override(Admin.view.controls.TedNumberColumn, props);
    Ext.override(Admin.view.controls.TedDateColumn, props);
    Ext.override(Admin.view.controls.TedBooleanColumn, props);
    Ext.override(Admin.view.controls.TedPictureColumn, props);
    //    Ext.override(Admin.view.controls.TedSelectColumn, props);

});
