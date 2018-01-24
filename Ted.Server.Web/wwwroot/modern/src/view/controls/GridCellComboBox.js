Ext.define('Admin.view.controls.GridCellComboBox', {
    extend: 'Ext.field.ComboBox',
    xtype: 'gridcellcombo',

    //store: {
    //    autoLoad: false,
    //    fields: ['name'],
    //    proxy: {
    //        type: 'tedproxy',
    //        //url: 'api/data/column/' + user.token + '/' + srcId + '/' + colname
    //    }
    //},

    displayField: 'name',
    valueField: 'name',
    //forceSelection: true,
    editable: true,

    //allowBlank: false,

    //listConfig: {
    //    loadingText: null,
    //    loadMask: false
    //},

    refresh(cmp) {
        let vm = Ext.ComponentQuery.query('main')[0].getViewModel();
        let user = vm.get('user');
        assert(user);
        assert(cmp.dataSourceId);
        assert(cmp.columnName);

        //let store = cmp.getStore();
        //store.getProxy().setUrl('api/data/column/' + user.token + '/' + cmp.dataSourceId + '/' + cmp.columnName)
        //cmp.getStore().load();

        AjaxUtil.get('api/data/column/' + user.token + '/' + cmp.dataSourceId + '/' + cmp.columnName,
            rsp => {
                cmp.setStore(rsp.data);
            });
    },

    listeners: {
        initialize: function (cmp) {
            
        },

        painted: function (cmp) {
            this.refresh(cmp);
        }
    }

});