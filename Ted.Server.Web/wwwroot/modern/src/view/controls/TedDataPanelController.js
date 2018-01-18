Ext.define('Admin.view.controls.TedDataPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.teddatapanel',

    control: {
        //'#': {
        //    initialize: function () {
        //        
        //    }
        //},
        'component[getHostButtons]': {

            initialize: function (cmp) {
                this.stealButtons(cmp);
            }
        },

    },

    initializePanel (cmp) {
        let vm = this.getViewModel();
        let proxy = vm.data.datasrc.proxy;
        let user = vm.get('user');

        Util.assert(cmp.dataSourceId, 'cmp.dataSourceId is missing');
        proxy.url += user.token + '/' + cmp.dataSourceId;

        vm.set('dataSourceId', cmp.dataSourceId);

        let oldHandler = proxy.errorHandler;
        proxy.errorHandler = function (err) {

            if (err.code === ExceptionCodes.TableNotFound) {
                let url = 'api/data/table/' + user.token + '/' + cmp.dataSourceId;
                AjaxUtil.post(url, {
                    columns: cmp.getFields()
                });
            }
            else {
                oldHandler(err);
            }
        };

        vm.data.datasrc.load();
    },

    stealButtons(cmp) {
        let tb = this.getView().getTbar();
        let buttons = cmp.getHostButtons();
        for (let b of buttons) {
            if (!this[b.handler]) {
                this[b.handler] = cmp.getController()[b.handler];
            }
        }
        tb.add(buttons);
    },

    onRemove(panel) {

        let page = panel.up('container[pageId!=null]');
        let vm = this.getViewModel();
        let token = vm.get('user.token');
        
        panel.getParent().remove(panel);
        let objTree = page.getComponentTree();

        
        AjaxUtil.put('/api/page/' + token + '/' + page.pageId, {
            json: JSON.stringify({
                items: objTree
            })
        });
    }


});
