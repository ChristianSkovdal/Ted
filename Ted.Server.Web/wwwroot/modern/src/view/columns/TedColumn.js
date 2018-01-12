Ext.define('Admin.view.columns.TedTextColumn', {
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

        getSerializableProperties() {
            return ['text', 'flex', 'itemId'];
        },

        getMenu() {
            let menu = this.callParent(arguments);
            if (!menu.specialItemsAdded) {
                menu.specialItemsAdded = true;

                menu.add({
                    xtype: 'menuseparator'
                });
                menu.add({
                    text: 'Add Column',
                    iconCls: 'x-fa fa-plus',

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

                menu.add({
                    text: 'Settings',
                    handler: 'columnSettings',
                    iconCls: 'x-fa fa-cog'
                });
            }

            return menu;
        }
    };
    
    Ext.override(Admin.view.columns.TedTextColumn, props);
    Ext.override(Admin.view.columns.TedNumberColumn, props);
    Ext.override(Admin.view.columns.TedDateColumn, props);
    Ext.override(Admin.view.columns.TedBooleanColumn, props);

});
