Ext.define('Admin.view.controls.TedStringColumn', {
    extend: 'Ext.grid.column.Text',
    xtype: 'tedstringcolumn',


});

Ext.define('Admin.view.controls.TedNumberColumn', {
    extend: 'Ext.grid.column.Number',
    xtype: 'tedintcolumn',

    editor: {
        xtype: 'numberfield',
        //minValue: 10,
        //maxValue: 15,
    }
});

Ext.define('Admin.view.controls.TedBooleanColumn', {
    extend: 'Ext.grid.column.Boolean',
    xtype: 'tedbooleancolumn'
});

Ext.define('Admin.view.controls.TedDateColumn', {
    extend: 'Ext.grid.column.Date',
    xtype: 'teddatecolumn',

    //format: 'd-Y-m'
    //renderer: 'onDateCellRender'
});

Ext.define('Admin.view.controls.TedSelectColumn', {
    extend: 'Ext.grid.column.Text',
    xtype: 'tedselectcolumn',

    editor: {
        xtype: 'combobox',
        queryMode: 'local',
        displayField: 'name',
        valueField: 'value',

        //store: [
        //    { abbr: 'AL', name: 'Alabama' },
        //    { abbr: 'AK', name: 'Alaska' },
        //    { abbr: 'AZ', name: 'Arizona' }
        //],

        listeners: {
            beforepickercreate: function (sender, value, oldValue, eOpts) {
               // debugger;
                let column = sender.up('grid').getColumns().find(c => c._editor);
                assert(column.columnConfig);

                if (column.columnConfig.type == ColumnSelectType.Simple) {

                    sender.setStore({
                       // data: column.columnConfig.options.map(r => { name=r, value=r} )
                    });
                }
                

            },
        }
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

        editable:true,

        getSerializableProperties() {
            return ['text', 'flex', 'itemId', 'dataType', 'dataIndex', 'columnConfig'];
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
                            handler: 'columnAdd',
                            columnXType: 'string'
                        },
                        {
                            text: 'Number',
                            handler: 'columnAdd',
                            columnXType: 'int'
                        },
                        {
                            text: 'Date',
                            handler: 'columnAdd',
                            columnXType: 'date'
                        },
                        {
                            text: 'Yes/No',
                            handler: 'columnAdd',
                            columnXType: 'boolean'
                        },
                        {
                            text: 'Select',
                            handler: 'columnAdd',
                            columnXType: 'string',
                            editor: 'tedselectcolumn'
                        },
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
    Ext.override(Admin.view.controls.TedSelectColumn, props);

});
