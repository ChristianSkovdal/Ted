Ext.define('Admin.view.controls.TedGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tedgrid',

    control: {
        //'grid': {
        //    initialize: 'gridInitialize'
        //}
    },

    requires: [
        'Aux.Util',
        'Admin.model.FlexRow'
    ],

    reload() {
        let vm = this.getViewModel();
        let grid = this.getView().down('grid');
        let store = grid.getStore();
        store.reload();
    },

    addRow() {
        let me = this;
        let vm = this.getViewModel();
        let grid = this.getView().down('grid');
        let store = grid.getStore();

        //let record = Ext.create('Admin.model.FlexRow', {
        //    fields: fields
        //});

        let getDefaultValue = (type) => {
            switch (type) {
                case 'date':
                    return new Date();
                case 'int':
                    return (store.count()+1)*100;
                case 'boolean':
                    return true;
            }
            return 'My data: ' + (store.count()+1);
        };

        let record = {};
        grid.getColumns().forEach(col => {
            record[col.getDataIndex()] = getDefaultValue(col.dataType);
        });

        store.insert(0, record);
        store.sync();
    },

    deleteRow() {

        let vm = this.getViewModel();
        let grid = this.getView().down('grid');
        let store = grid.getStore();
        let selected = vm.get('selected');
        let idx = store.indexOf(selected);
        
        store.remove(selected);
        store.sync({
            vm: vm,
            store: store,
            deletedIndex: idx,
            success(batch, opts) {
                if (idx > 0) {
                    let prev = opts.store.getAt(idx - 1);
                    opts.vm.set('selected', prev);
                }
                else {
                    opts.vm.set('selected', opts.store.getAt(0)); // If the store is empty selectedd=null (ok)
                }               
            }
        });
    },

    columnAdd(itm, event) {

        let vm = this.getViewModel();
        let grid = this.getView();
        let user = vm.get('user');

        let column = itm.up('column');
        let hdr = grid.getHeaderContainer();

        // UI Column definition
        let obj = {
            dataIndex: 'col' + (hdr.getItems().length + 1),
            xtype: 'ted' + itm.columnXType + 'column',
            text: Util.capitalizeFirstLetter(itm.columnXType) + ' Column ' + (hdr.getItems().length + 1),
            flex: 1,
            itemId: Util.createCmpGuid(),
            dataType: itm.columnXType
        };

        // Insert UI column
        let index = hdr.getItems().indexOf(column);
        index++;
        hdr.insert(index, obj);

        // Find the page from the tab so the UI hierachy are serialized
        let canvas = grid.upsafe('workspacecanvas');
        let panel = grid.upsafe('container[dataSourceId!=null]');

        let objTree = canvas.getComponentTree();

        // The AJAX argument
        var arg = {
            json: JSON.stringify({
                items: objTree
            }),
            column: {
                name: obj.dataIndex,
                type: itm.columnXType
            },
            dataSourceId: panel.dataSourceId
        };

        // Send a request to update the page json as well as creating the column in the table
        AjaxUtil.put('/api/page/' + user.token + '/' + canvas.pageId, arg);

    },

    gridInitialize(cmp, opts) {

    }


});
