Ext.define('Admin.view.controls.TedFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tedform',

    control: {
        'tedform': {
            refreshLinkedData: function (masterGrid, record) {
                debugger;
                //let masterRecordId = record.get('id');

                //this.getView().getStore().load({
                //    params: {
                //        masterRecordId: masterRecordId,
                //        masterId: masterGrid.getParent().getItemId()
                //    }
                //});
            },
            addItem: function (panel, item) {
                if (item.componentJson) {
                    this.addComponentCode(panel, item);
                }
            },
            painted: function (form) {
                Ext.create({
                    xtype: 'teditor'
                }).show();


            }

        }
    },

    requires: [
        'Aux.Util',
        'Admin.view.dialogs.TEditorWindow'
    ],

    addComponentCode(panel, item) {
        //try {
        //    let children = JSON.parse(item.componentJson);
        //    panel.add(children);
        //} catch (e) {
        //    Ext.Msg.alert('Error Parsing Form Components', e.message);
        //}
    }


});
