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
                hidden:true,
                xtype: 'filefield',

                listeners: {
                    scope: 'controller',
                    change: function (cmp, filename, oldval, opts) {
                        this.getView().down('grid').getController().onImportFileChange(cmp, filename, oldval, opts);
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
