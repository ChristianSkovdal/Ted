Ext.define('Admin.view.controls.TedPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tedpanel',

    control: {
        '*': {
            painted: function (cmp) {
                //debugger;
            }
        },
        'grid': {
            initialize: 'gridInitialize'
        }
    },

    requires: [
        'Aux.Util'
    ],

    
    insertAfter(obj, id, tree) {

        let findItem = function(id,tree) {


        }
        
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

        let xtype = 'tedtextcolumn';
        switch (itm.type) {
            case ColumnMenuItemType.Number: 
        }

        let obj = {
            xtype: 'tedcolumn',
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
