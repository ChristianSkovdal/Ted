Ext.define('Admin.mixins.TedColumnMixin', {
    extend: 'Ext.Mixin',


    getSerializableProperties() {

        return ['text', 'flex', 'itemId'];

    },

    extendMenu(menu) {
        
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
                        type: ColumnMenuItemType.Text
                    },
                    {
                        text: 'Number',
                        handler: 'columnAdd',
                        type: ColumnMenuItemType.Number
                    },
                    {
                        text: 'Date',
                        handler: 'columnAdd',
                        type: ColumnMenuItemType.Date
                    },
                    {
                        text: 'Yes/No',
                        handler: 'columnAdd',
                        type: ColumnMenuItemType.Boolean
                    },
                ]
            });
            //menu.add({
            //    text: 'Remove',
            //    handler: 'columnRemove'
            //});
            menu.add({
                text: 'Settings',
                handler: 'columnSettings',
                iconCls: 'x-fa fa-cog'
            });
        }

        return menu;
    }

});