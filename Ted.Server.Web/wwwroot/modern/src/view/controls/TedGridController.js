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
        'Admin.model.FlexRow',
        'Admin.view.controls.GridCellComboBox'
    ],

    reload() {
        let vm = this.getViewModel();
        let v = this.getView();
        let grid = v.down('tedgrid') || v;
        let store = grid.getStore();
        store.reload();
    },

    addRow() {
        let me = this;
        let vm = this.getViewModel();
        let grid = this.getView().down('grid');
        let store = grid.getStore();

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
            if (col.getDataIndex() != 'id')
                record[col.getDataIndex()] = getDefaultValue(col.dataType);
        });

        let error = false;
        let mtid = grid.getMasterTableId();
        if (mtid) {
            let masterPanel = Ext.ComponentQuery.query('#' + mtid);
            assert(masterPanel.length <= 1);
            if (masterPanel.length === 0) {
                error = true;
                Ext.Msg.alert('Table not found', 'The master table with id ' + mtid + ' does not exist. Do you wish to convert the linked table into a regular table?', (btn, val, opts) => {
                    // TODO:
                    debugger;
                });
            }
            else {
                let grid = masterPanel[0].down('tedgrid');
                assert(grid);
                let selectedMasterRecord = grid.getSelection();
                if (selectedMasterRecord) {
                    record[mtid + '_id'] = selectedMasterRecord.get('id');
                }
                else {
                    error = true;
                    Ext.Msg.alert('Select Master Record', 'No row in the master table is selected. Select one before adding a row in a linked table');
                }

            }
        }

        if (!error) {

            vm.set('selected', null);
            store.suspendAutoSync();
            store.insert(0, record);
            //store.on('add', (s,o) => vm.set('selected', o.getRecords()[0]));

            store.sync({
                vm: vm,
                store: store,
                success(batch, opts) {
                    let prev = opts.store.getAt(0);
                    opts.vm.set('selected', prev);
                }
            });
            store.resumeAutoSync();
        }

    },

    deleteRow() {

        let vm = this.getViewModel();
        let grid = this.getView().down('grid');
        let store = grid.getStore();
        let selected = vm.get('selected');
        let idx = store.indexOf(selected);
        assert(idx >= 0);

        store.suspendAutoSync();
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
        store.resumeAutoSync();
    },

    cellRenderer(value, record, index, cell, column) {

        if (column.scriptCode) {
            if (!column.scriptFunction) {
                column.scriptFunction = new Function('value', 'data', 'name', 'record', 'cell', 'column', column.scriptCode);
            }

            return column.scriptFunction(value, record.data, index, record, cell, column);
        }

        return value;
    },

    columnSettings(itm, event) {

        let vm = this.getViewModel();
        let grid = this.getView();
        let user = vm.get('user');

        let column = itm.up('column');

        // OPTIONS COMBO
        //column.setEditor({
        //    name: column.getDataIndex(),
        //    xtype: 'selectfield',
        //    options: [
        //        'Shade',
        //        'Mostly Shady',
        //        'Sun or Shade',
        //        'Mostly Sunny',
        //        'Sunny'
        //    ]
        //});

        // REMOTE DATA COMBO
        //const srcId = '_1_fcsbLnxvXTYxLJbv';
        //const colname = 'col2';

        //column.setEditor({
        //    dataSourceId: srcId,
        //    columnName: colname,
        //    xtype: 'gridcellcombo',
        //    //itemTpl: '<span role="option" class="x-boundlist-item">{abbr} - {name}</span>',
        //    //displayTpl: '{abbr} - {name}',
        //});

        // FUNCTION CELL
        //debugger;
        column.scriptCode = 'record.set("col2", "Dims Dims: "+value); return value';
        this.reload();

        let hdr = grid.getHeaderContainer();

        // Find the page from the tab so the UI hierachy are serialized
        let canvas = grid.upsafe('workspacecanvas');

        let objTree = canvas.getComponentTree();

        // The AJAX argument
        var arg = {
            json: JSON.stringify({
                items: objTree
            })
        };

        // Send a request to update the page json as well as creating the column in the table
        AjaxUtil.put('/api/page/' + user.token + '/' + canvas.pageId, arg);

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
            xtype: itm.editor || 'ted' + itm.columnXType + 'column',
            text: Util.capitalizeFirstLetter(itm.columnXType) + ' Column ' + (hdr.getItems().length + 1),
            flex: 1,
            itemId: Util.createCmpGuid(),
            dataType: itm.columnXType,
        };

        // Insert UI column
        let index = hdr.getItems().indexOf(column);
        index++;
        hdr.insert(index, obj);

        // Notify that the model has changed
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
    },


    showAll() {
        let grid = this.getView().down('tedgrid');
        grid.getStore().load();
    },

    duplicateRowButtonClick() {
        let vm = this.getViewModel();
        let grid = this.getView().down('tedgrid');
        var store = grid.getStore();
        let selected = vm.get('selected');
        let index = store.indexOf(selected);
        
        vm.set('selected', null);
        store.suspendAutoSync();

        let rec = store.insert(index, {})[0];

        for (var prop in selected.data) {
            if (prop != 'id') {
                rec.set(prop, selected.get(prop));
            }
        }

        store.sync({
            vm: vm,
            success(batch, opts) {
                opts.vm.set('selected', opts.operations.create[0]);
                store.resumeAutoSync();
            }
        });
    },

    importButtonClick() {


        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }

    }

});
