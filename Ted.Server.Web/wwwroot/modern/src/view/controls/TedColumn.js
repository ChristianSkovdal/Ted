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
            return ['text', 'flex', 'itemId', 'dataType', 'dataIndex', '.editor'];
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

                };
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
                        //{
                        //    text: 'Select',
                        //    handler: 'columnAdd',
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
    //    Ext.override(Admin.view.controls.TedSelectColumn, props);

});
