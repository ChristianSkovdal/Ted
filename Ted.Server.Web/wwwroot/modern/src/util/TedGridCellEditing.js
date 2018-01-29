Ext.define('Ted.Util.TedGridCellEditing', {
    extend: 'Ext.grid.plugin.CellEditing',
    alias: ['plugin.tedgridcellediting'],

    requires: [
        'Ext.grid.CellEditor',
        'Ext.grid.Location'
    ],

    getEditor: function (location) {
        let editor = this.callParent(arguments);

        if (editor.xtype === 'picturepicker') {

            editor.updateValue = function (value) {               
                var column = location.column;
                let fieldName = column.getDataIndex();
                location.record.set(fieldName, value);
            }

        }

        return editor;
    },

});