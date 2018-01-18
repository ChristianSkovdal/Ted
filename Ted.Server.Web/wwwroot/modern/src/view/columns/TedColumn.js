Ext.define('Admin.view.columns.TedStringColumn', {
    extend: 'Ext.grid.column.Text',
    xtype: 'tedstringcolumn'
});

Ext.define('Admin.view.columns.TedNumberColumn', {
    extend: 'Ext.grid.column.Number',
    xtype: 'tedintcolumn'
});

Ext.define('Admin.view.columns.TedBooleanColumn', {
    extend: 'Ext.grid.column.Boolean',
    xtype: 'tedbooleancolumn'
});

Ext.define('Admin.view.columns.TedDateColumn', {
    extend: 'Ext.grid.column.Date',
    xtype: 'teddatecolumn'
});

Ext.define('Admin.view.columns.TedColumnInitializer', {}, () => {

    var props = {

        editable:true,

        getSerializableProperties() {
            return ['text', 'flex', 'itemId', 'dataType', 'dataIndex'];
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

    Ext.override(Admin.view.columns.TedStringColumn, props);
    Ext.override(Admin.view.columns.TedNumberColumn, props);
    Ext.override(Admin.view.columns.TedDateColumn, props);
    Ext.override(Admin.view.columns.TedBooleanColumn, props);

});
