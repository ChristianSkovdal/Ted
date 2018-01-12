Ext.define('Admin.view.controls.TedGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tedgrid',

    control: {
        'grid': {
            initialize: 'gridInitialize'
        }
    },

    requires: [
        'Aux.Util'
    ],

    addRow() {

        let grid = this.getView();



        let store = grid.getStore();
        if (!store) {

            let store = Ext.create('Ext.data.Store', {

            });

            this.setStore(store);            
        }

        let fields = [];
        for (let col in grid.getColumns()) {
            fields.push({
                type: col.columnXType,
                name: col.dataIndex
            });
        }

        let record = Ext.create('Ext.data.Model', {
            fields: fields
        });
        
        store.add(record);

    },
 
    columnAdd(itm, event) {

        let vm = this.getViewModel();
        let user = vm.get('user');

        let mainView = itm.up('main');
        let navigationTree = mainView.getController().lookup('navigationTree');
        let tab = navigationTree.getSelection();

        let column = itm.up('column');
        let grid = column.up('tedgrid');
        let hdr = grid.getHeaderContainer();

        let obj = {
            dataIndex: 'col' + (hdr.getItems().length + 1),
            xtype: 'ted' + itm.columnXType + 'column',
            text: 'Column ' + (hdr.getItems().length + 1),
            flex: 1,
            itemId: Util.createGuid()
        };
        
        let index = hdr.getItems().indexOf(column);
        index++;
        hdr.insert(index, obj);

        let page = itm.up('container[routeId=page:' + tab.id + ']');
        let objTree = page.getComponentTree();

        var arg = {
            json: JSON.stringify({
                items: objTree
            })
        };

        AjaxUtil.put('/api/page/' + user.token + '/' + tab.id,
            arg,
            rsp => {
            },
            err => {
                Ext.Msg.alert('Communication Error', 'An error ocurred while inserting component');                
            }
        );

    },

    gridInitialize(cmp, opts) {
        
    }
    
});
