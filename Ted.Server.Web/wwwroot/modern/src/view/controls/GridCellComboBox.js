Ext.define('Admin.view.controls.GridCellComboBox', {
    extend: 'Ext.field.ComboBox',
    xtype: 'gridcellcombo',

    displayField: 'name',
    valueField: 'name',
    editable: true,

    refresh(cmp) {
        let vm = Ext.ComponentQuery.query('main')[0].getViewModel();
        let user = vm.get('user');
        assert(user);
        assert(cmp.dataSourceId);
        assert(cmp.columnName);

        AjaxUtil.get('api/data/column/' + user.token + '/' + cmp.dataSourceId + '/' + cmp.columnName,
            rsp => {
                cmp.setStore(rsp.data);
            });
    },

    listeners: {

        painted: function (cmp) {
            this.refresh(cmp);
        }
    }

});