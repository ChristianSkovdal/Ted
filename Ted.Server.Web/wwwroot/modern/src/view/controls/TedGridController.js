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
                    return 123;
                case 'boolean':
                    return true;
            }
            return 'My data';
        };

        let record = {};
        grid.getColumns().forEach(col => {
            record[col.getDataIndex()] = getDefaultValue(col.dataType);
        });

        store.add(record);
        store.sync();
    },

    deleteRow() {
        let me = this;
        let vm = this.getViewModel();
        let grid = this.getView().down('grid');
        let store = grid.getStore();

        //let record = {};
        //grid.getColumns().forEach(col => {
        //    record[col.getDataIndex()] = getDefaultValue(col._dataType);
        //});

        //store.add(record);
        //store.sync();
    },

    columnAdd(itm, event) {

        let vm = this.getViewModel();
        let user = vm.get('user');

        let mainView = itm.up('main');
        let navigationTree = mainView.getController().lookup('navigationTree');
        let tab = navigationTree.getSelection();
         // TODO: use the workspacecanvas pageId - let page = panel.up('container[pageId!=null]');
        let column = itm.up('column');
        let grid = this.getView();
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
        let page = itm.up('container[routeId=page:' + tab.id + ']');

        let objTree = page.getComponentTree();
        // The AJAX argument
        var arg = {
            json: JSON.stringify({
                items: objTree
            }),
            column: {
                name: obj.dataIndex,
                type: itm.columnXType
            },
            dataSourceId: vm.get('dataSourceId')
        };

        // Send a request to update the page json as well as creating the column in the table
        AjaxUtil.put('/api/page/' + user.token + '/' + tab.id,
            arg,
            rsp => {
            }
            //err => {
            //    Ext.Msg.alert('Communication Error', 'An error ocurred while inserting component');
            //}
        );

    },

    gridInitialize(cmp, opts) {
        
        //let vm = this.getViewModel();
        //let view = this.getView();
        //let user = vm.get('user');

        //let store = Ext.create('Ext.data.Store',
        //    {
        //        autoLoad: false,
        //        model: 'Admin.model.FlexRow',

        //        proxy: {
        //            url: 'api/data/' + vm.get('user').token + '/' + view.dataSourceId,
        //            type: 'tedproxy',
        //        }
        //        //data: [
        //        //    { col1: "msft", col2: '2011/04/03', change: 2.43, volume: 61606325, topday: '04/01/2010' },
        //        //    { col1: "goog", col2: '2011/04/03', change: 0.81, volume: 3053782, topday: '04/11/2010' },
        //        //    { col1: "apple", col2: '2011/04/03', change: 1.35, volume: 24484858, topday: '04/28/2010' },
        //        //    { col1: "sencha", col2: '2011/04/03', change: 8.85, volume: 5556351, topday: '04/22/2010' }
        //        //]

        //    });

        //let proxy = store.getProxy();
        //let oldHandler = proxy.errorHandler;
        //proxy.errorHandler = function (err) {

        //    if (err.code === ExceptionCodes.TableNotFound) {

        //        let url = 'api/data/table/' + user.token + '/' + cmp.dataSourceId;
        //        AjaxUtil.post(url, {
        //            columns: cmp.getColumnsDefinitions()
        //        });
        //    }
        //    else {
        //        oldHandler(err);
        //    }
        //};

        //view.setStore(store);
        //
        //cmp.getStore().load();

    }


});
