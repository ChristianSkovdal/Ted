Ext.define('Admin.view.controls.TedColumn', {
    extend: 'Ext.grid.column.Column',
    xtype: 'tedcolumn',

    mixins: {
        tedcol: 'Admin.mixins.TedColumnMixin'
    },

    getMenu() {
        let menu = this.callParent(arguments);
        return this.extendMenu(menu);
    }

});
