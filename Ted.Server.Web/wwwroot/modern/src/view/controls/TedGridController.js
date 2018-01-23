Ext.define('Admin.view.controls.TedGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tedgrid',

    control: {
        'tedgrid': {
            select: function (cmp, records, eOpts) {
                let hostPanel = this.getView().getParent();
                let listeners = Ext.ComponentQuery.query('panelhost[masterTableId=' + hostPanel.getItemId() + ']');
                for (let linked of listeners) {
                    let grid = linked.down('tedgrid');
                    grid.fireEvent('refreshLinkedData', cmp, records[0]);
                }
            },

            refreshLinkedData: function (masterGrid, record) {

                let masterRecordId = record.get('id');
                
                this.getView().getStore().load({
                    params: {
                        masterRecordId: masterRecordId,
                        masterId: masterGrid.getParent().getItemId()
                    }
                });
            }
        }
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
                    return (store.count() + 1) * 100;
                case 'boolean':
                    return true;
            }
            return 'My data: ' + (store.count() + 1);
        };

        let record = {};
        grid.getColumns().forEach(col => {
            record[col.getDataIndex()] = getDefaultValue(col.dataType);
        });

        let mtid = grid.getMasterTableId();
        if (mtid) {
            let masterPanel = Ext.ComponentQuery.query('#' + mtid);
            if (masterPanel.length === 0) {
                Msg.error('Table not found', 'The master table with id ' +mtid+ ' does not exist');
            }
            else {        
                let grid = masterPanel[0].down('tedgrid');
                assert(grid);
                let selectedMasterRecord = grid.getSelection();
                debugger;
                if (selectedMasterRecord) {
                    record[mtid+'_id'] = selectedMasterRecord.get('id');
                }
                else {
                    Ext.Msg.alert('Select Master Record', 'No row in the master table is selected. Select one before adding a row in a linked table');
                }
                
            }
        }

        store.insert(0, record);
        //store.sync();
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

    //onDateCellRender(value, record) {
    //    debugger;
    //    let ms = Date.parse('20 Aug 1973 14:58:14 GMT');
    //    let date = new Date(ms);
    //    let res = Ext.Date.format(value, 'm-d-Y g:i A');;
    //    return date.toString();
    //},

    columnSettings(itm, event) {

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

        // Notify that th emodel has changed
        grid.getParent().fireEvent('modelChange');

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


    }

});
