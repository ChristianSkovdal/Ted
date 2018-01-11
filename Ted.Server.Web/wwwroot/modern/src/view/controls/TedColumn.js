Ext.define('Admin.view.controls.TedColumn', {
    extend: 'Ext.grid.column.Column',
    xtype: 'tedcolumn',

    //requires: [
    //    'Admin.view.controls.TedPanelController',
    //    'Admin.view.controls.TedPanelModel'
    //],

    getSerializableProperties() {

        return ['text','flex'];

    },

    getMenu() {
        let menu = this.callParent(arguments);
        if (!menu.specialItemsAdded) {
            menu.specialItemsAdded = true;

            menu.add({
                xtype: 'menuseparator'
            });
            menu.add({
                text: 'Add',
                handler: 'columnAdd',
                iconCls: 'x-fa fa-plus',

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
