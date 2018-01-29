Ext.define('Admin.view.controls.TedGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tedgrid',

    control: {
        'importcolumn>menu': {
            click: 'importColumnMenuClick'
        },
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
        'Admin.view.controls.GridCellComboBox',
        'Admin.view.dialogs.ImportDlg'
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

        //let getDefaultValue = (type) => {
        //    switch (type) {
        //        case 'date':
        //            return new Date();
        //        case 'int':
        //            return (store.count() + 1) * 100;
        //        case 'boolean':
        //            return true;
        //    }
        //    return 'My data: ' + (store.count() + 1);
        //};

        let record = {};
        //grid.getColumns().forEach(col => {
        //    if (col.getDataIndex() != 'id')
        //        record[col.getDataIndex()] = getDefaultValue(col.dataType);
        //});

        let error = false;
        let mtid = grid.getMasterTableId();
        if (mtid) {
            let masterPanel = Ext.ComponentQuery.query('#' + mtid);
            assert(masterPanel.length <= 1);
            if (masterPanel.length === 0) {
                error = true;
                Ext.Msg.alert('Table not found', 'The master table with id ' + mtid + ' does not exist. Do you wish to convert the linked table into a regular table?', (btn, val, opts) => {
                    // TODO:

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

    textCellRenderer(value, record, index, cell, column) {
        if (column.scriptCode) {
            if (!column.scriptFunction) {
                column.scriptFunction = new Function('value', 'data', 'name', 'record', 'cell', 'column', column.scriptCode);
            }

            return column.scriptFunction(value, record.data, index, record, cell, column);
        }

        return value;
    },

    pictureCellRenderer(value, record, index, cell, column) {

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

    createUniqueColumnDataIndex(baseName) {

        baseName = baseName.replace(/\W/g, '');

        let max = 10;
        let i = 1;

        if (baseName.length >= 1) {
            let temp = baseName;

            for (; this.getView().getColumns().some(r => r.getDataIndex() === temp) && i <= max; i++) {
                temp = baseName + i;
            }
            baseName = temp;
        }
        else {
            return Util.createCmpGuid();
        }

        if (i === max) {
            return Util.createCmpGuid();
        }
        return baseName;
    },

    addColumn(menuItem, event) {

        let vm = this.getViewModel();
        let grid = this.getView();

        let column = menuItem.up('column');
        let hdr = grid.getHeaderContainer();

        // UI Column definition
        let colName = menuItem.getText() + ' Column ' + (hdr.getItems().length + 1);
        let dataIndex = this.createUniqueColumnDataIndex(colName);

        assert(!menuItem.editor);
        let obj = {
            dataIndex: dataIndex,
            xtype: menuItem.columnXType,
            text: colName + ' (' + dataIndex + ')',
            flex: 1,
            itemId: Util.createCmpGuid(),
            dataType: menuItem.dataType
        };

        // Insert UI column
        let index = hdr.getItems().indexOf(column);
        index++;

        this.insertColumn(index, obj, grid);
    },


    insertColumn(index, obj, grid) {

        let user = App.getUser();

        let hdr = grid.getHeaderContainer();
        

        if (index >= 0) {
            hdr.insert(index, obj);
        }
        else {
            hdr.add(obj);
        }

        // Notify that the model has changed
        // grid.getParent().fireEvent('modelChange');

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
                type: obj.dataType
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
            if (prop !== 'id') {
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

    onImportFileChange(cmp, filename, oldval, opts) {
        let reader = new FileReader();
        let grid = this.getView();

        reader.onload = (e) => {
            let text = e.target.result;
            const columNamesInFirstRow = true;
            let lines = text.split('\n');
            
            for (var i = 0; i < lines.length; i++) {
                lines[0] = lines[0].trim().replace('\r', '');
            }

            let firstRow = lines[0].split(';');
            if (lines.length > 0) {

                let columnNames = firstRow;
                if (!columNamesInFirstRow) {
                    for (let i = 1; i <= firstRow.length; i++) {
                        columnNames.push('column+' + i);
                    }
                }
                let data = [];
                for (let i = 0; i < lines.length; i++) {
                    if (i > 0) {

                        if (i % 100 === 0)
                            console.log('Importing row #' + i);

                        let obj = {};
                        let tokens = lines[i].split(';');
                        if (tokens.length > 1) {                        
                            for (let i = 0; i < Math.min(tokens.length, columnNames.length); i++) {
                                obj[columnNames[i]] = tokens[i];
                            }
                            data.push(obj);
                        }
                    }                }
                
                var store = Ext.create('Ext.data.Store', {
                    fields: columnNames,
                    data: data,
                    originalData: data
                });
                
                let w = Ext.create({
                    xtype: 'importdlg',
                    controller: 'tedgrid',
                    title: 'Import ' + filename,
                    destinationGrid: grid,
                    columnNames: columnNames,
                    items: [
                        {
                            xtype: 'grid',
                            itemId: 'importGrid',
                            columns: columnNames.map(r => ({
                                text: Util.capitalizeFirstLetter(r).replace('_', '') + ' (Create)',
                                oldText: Util.capitalizeFirstLetter(r).replace('_', ''),
                                dataIndex: r,
                                xtype: 'importcolumn',
                                importAction: 'create'
                            })),
                            store: store
                        }
                    ]
                });

                w.show();
            }

        };
        reader.readAsText(cmp.getFiles()[0]);
    },

    onStartImport() {
        let dlg = this.getView();
        let srcgrid = dlg.downsafe('grid');
        assert(dlg.destinationGrid);
        let dst = dlg.destinationGrid.getStore();

        let src = srcgrid.getStore();
        
        // First let se if we have to create any columns
        for (let col of srcgrid.getColumns()) {
            if (col.importAction === 'create') {
                if (!this.createImportColumn(col.oldText, col.getDataIndex(), dlg.destinationGrid)) {
                    return;
                }
                else {
                    col.destinationColumn = col.getDataIndex();
                }
            }
        }
        
        let columns = srcgrid.getColumns();
        let postData = [];
        for (let row of src.originalData) {
            let idx = 0;
            delete row['id'];
            let newRow = {};
            for (prop in row) {
                let column = columns[idx];
                if (column.importAction !== 'ignore') {
                    newRow[column.destinationColumn] = row[prop];
                }
                idx++;
            }
            postData.push(newRow);
        }
        
        AjaxUtil.post('/api/data/' + App.getUser().token + '/' + dlg.destinationGrid.upsafe('panelhost').dataSourceId,
            postData,
            () => {
                dst.reload();
                dlg.destroy();
            }
        );

        //// Next start the import
        //dst.suspendAutoSync();
        //for (var i = 0; i < 10; i++) {
        //    dst.add({
        //        col1: 'Nr ' + i
        //    });
        //}
        //dst.resumeAutoSync();
        
        ////dst.add(src.getRange());
        ////debugger;
        //dst.sync();
    },

    createImportColumn(name, dataIndex, dstGrid) {

        if (dstGrid.getColumns().some(c => c.getText() === name)) {
            Ext.Msg.alert('Could Not Import', 'Cannot create the column. There is already a column in the destination table with the name ' + name);
            return false;
        }
        else {

            //let temp = '';
            //let counter = 1;
            //while (dstGrid.getColumns().some(c => c.getDataIndex()) == dataIndex)) {
            //    temp = dataIndex + (counter++);
            //}
            //dataIndex = temp;

            let obj = {
                dataIndex: dataIndex,
                xtype: 'tedstringcolumn',
                text: name,
                flex: 1,
                itemId: Util.createCmpGuid(),
                dataType: 'string'
            };


            this.insertColumn(-1, obj, dstGrid);
        }

        return true;
    },

    importColumnMenuClick(menu, item, evt) {

        let grid = this.getView();
        let column = menu.up('column');

        let action = '';
        let text = '';

        if (item.getItemId() === 'column-create') {
            text = column.oldText + ' (Create)';
            action = 'create';
        }
        else if (item.getItemId() === 'column-ignore') {            
            text = column.oldText + ' (Ignore)';
            action = 'ignore';
        }
        else {
            text = item.getText();
            column.destinationColumn = item.getItemId();
            action = 'map';
        }

        column.importAction = action;
        column.setText(text);        

    }


});
