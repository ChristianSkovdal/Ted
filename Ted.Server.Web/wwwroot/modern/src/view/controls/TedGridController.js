Ext.define('Admin.view.controls.TedGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tedgrid',

    control: {
        'grid': {
            initialize: 'gridInitialize'
        }
    },

    requires: [
        'Aux.Util',
        'Admin.model.FlexRow'
    ],

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
            record[col.getDataIndex()] = getDefaultValue(col._dataType);
        });

        let columns = grid.getColumns().map(r => {
            return {
                type: r.dataType,
                name: r.getDataIndex()
            }
        });
        debugger;

        let proxy = store.getProxy();
        let oldHandler = proxy.errorHandler;
        proxy.errorHandler = function (err) {
            if (err.code == ExceptionCodes.TableNotFound) {

                // Create the table and retry
                AjaxUtil.post('api/data/table/' + vm.get('user').token + '/' + grid.getItemId(), {
                    row: record,
                    columns: columns
                });
            }
            else {
                oldHandler(err);
            }
        }

        store.add(record);
        store.sync();
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
            text: Util.capitalizeFirstLetter(itm.columnXType) + ' Column ' + (hdr.getItems().length + 1),
            flex: 1,
            itemId: Util.createGuid(),
            _dataType: itm.columnXType
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

        let vm = this.getViewModel();
        let view = this.getView();
        //debugger;
        let store = Ext.create('Ext.data.Store',
            {
                autoLoad: false,
                model: 'Admin.model.FlexRow',

                proxy: {
                    url: 'api/data/' + vm.get('user').token + '/' + view.getItemId(),
                    type: 'tedproxy',
                }
            });
        //var store = Ext.create('Ext.data.Store', {
        //    fields: ['name', 'email', 'phone'],
        //    data: [
        //        { 'name': 'Lisa', "email": "lisa@simpsons.com", "phone": "555-111-1224" },
        //        { 'name': 'Bart', "email": "bart@simpsons.com", "phone": "555-222-1234" },
        //        { 'name': 'Homer', "email": "home@simpsons.com", "phone": "555-222-1244" },
        //        { 'name': 'Marge', "email": "marge@simpsons.com", "phone": "555-222-1254" }
        //    ]
        //});

        view.setStore(store);
        store.load({
            callback(records, operation, success) {

            }
        });

    }


});
