Ext.define('Admin.view.controls.TedGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'tedgrid',

    requires: [
        'Admin.view.controls.TedGridController',
    ],

    hostedItem: true,

    controller: 'tedgrid',

    //plugins: [{
    //    type: 'cellediting'
    //}],

    plugins: {
        gridcellediting: {
            selectOnEdit: true
        }
    },

    //selectable: {
    //    rows: false,
    //    cells: true
    //},

    getMasterTableId() {
        return this.getParent().getMasterTableId();
    },

    listeners: {
        specialkey: function () {

        }
    },


    bind: {
        selection: '{selected}',
    },

    getSerializableProperties() {
        return ['itemId'];
    },

    getChildren() {
        return this.getColumns();
    },

    getFields() {
        return this.getColumns()
            .filter(r => r._dataIndex != 'id')
            .map(r => {
                return {
                    type: r.dataType || r._dataType,
                    name: r._dataIndex
                }
            });

    },


    getHostButtons() {

        let buttons = [
            {
                text: 'Add',
                iconCls: 'x-fa fa-plus',
                handler: 'addRow'
            },
            //{
            //    text: 'Edit',
            //    iconCls: 'x-fa fa-pencil',
            //    bind: {
            //        disabled: '{!selected}'
            //    }
            //},
            {
                text: 'Delete',
                iconCls: 'x-fa fa-minus',
                handler: 'deleteRow',
                bind: {
                    disabled: '{!selected}'
                }
            },
            {
                text: 'Refresh',
                iconCls: 'x-fa fa-refresh',
                handler: 'reload'
            },
            {
                iconCls: 'x-fa fa-clone',
                margin: '0 7 0 0',
                text: 'Duplicate',
                handler: 'duplicateRowButtonClick',
                bind: {
                    disabled: '{!selected}'
                }
            },
            {
                // hidden:true,
                xtype: 'filefield',

                listeners: {
                    change: function (cmp, filename, oldval, opts) {
                        let reader = new FileReader();

                        reader.onload = (e) => {
                            let text = e.target.result;
                            const columNamesInFirstRow = true;
                            let lines = text.split('\n');
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

                                        console.log('Importing row #'+i);
                                        let obj = {};
                                        let tokens = lines[i].split(';');
                                        for (let i = 0; i < Math.min(tokens.length, columnNames.length); i++) {
                                            obj[columnNames[i]] = tokens[i];
                                        }
                                        data.push(obj);
                                    }
                                }
                                debugger;

                                var store = Ext.create('Ext.data.Store', {
                                    fields: columnNames,
                                    data: data
                                });
                             

                                let w = Ext.widget('window', {
                                    title: 'Import',
                                    resizeable: true,
                                    width: 800,
                                    height: 400,
                                    layout:'fit',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            columns: columnNames.map(r => ({
                                                text: Util.capitalizeFirstLetter(r).replace('_', ''),
                                                dataIndex: r,
                                                flex: 1
                                            })),
                                            store: store

                                        }
                                    ],


                                });

                                w.show();
                            }

                        };
                        reader.readAsText(cmp.getFiles()[0]);
                    }

                }
            },
            {
                text: 'Import',
                iconCls: 'x-fa fa-cloud-upload',
                margin: '0 7 0 0',
                handler: function () {
                    $('input[type=file]').trigger('click');
                },


            },
        ];

        if (this.getMasterTableId()) {
            buttons.push({
                text: 'Show All',
                iconCls: 'x-fa fa-eye',
                handler: 'showAll'
            });
        }

        return buttons;
    },






});
