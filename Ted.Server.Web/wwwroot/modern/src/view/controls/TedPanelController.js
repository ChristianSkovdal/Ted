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

    columnAdd(itm, event) {

        let vm = this.getViewModel();
        let user = vm.get('user');

        let mainView = itm.up('main');
        let navigationTree = mainView.getController().lookup('navigationTree');
        let tab = navigationTree.getSelection();

        let column = itm.up('column');
        let grid = column.up('tedgrid');
        let hdr = grid.getHeaderContainer();

        let page = itm.up('container[routeId=page:' + tab.id + ']');
        let objTree = page.getComponentTree();

        let obj = {
            xtype: 'tedcolumn',
            text: 'Column ' + hdr.getItems().length + 1,
            flex: 1,
            itemId: Util.createGuid()
        };

        

        AjaxUtil.put('/api/page/' + user.token + '/' + tab.id,
            {
                json: JSON.stringify(objTree)
            },
            rsp => {

                let index = hdr.getItems().indexOf(column);
                index++;
                hdr.insert(index, obj);

            },
            //rsp => {
            //    //this.redirectTo(routeId, true);
            //}
        );

    },

    gridInitialize(cmp, opts) {

    }
    
});
