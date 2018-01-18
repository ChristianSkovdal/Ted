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
                cmp.setStore(this.getStore());
                this.stealButtons(cmp);
            }
        },

    },

    getStore() {
        var panel = this.getView();

        if (!panel.store) {
            panel.store = Ext.create('Ext.data.Store', {
                autoLoad: false,
                model: 'Admin.model.FlexRow',

                proxy: {
                    url: 'api/data/',
                    type: 'tedproxy',
                }
            });

            let vm = this.getViewModel();
            let proxy = panel.store.proxy;
            let user = vm.get('user');

            assert(panel.dataSourceId, 'cmp.dataSourceId is missing');
            proxy.url += user.token + '/' + panel.dataSourceId;

            let oldHandler = proxy.errorHandler;
            proxy.errorHandler = function (err) {

                if (err.code === ExceptionCodes.TableNotFound) {
                    let url = 'api/data/table/' + user.token + '/' + panel.dataSourceId;
                    AjaxUtil.post(url, {
                        columns: panel.getFields()
                    });
                }
                else {
                    oldHandler(err);
                }
            };

            panel.store.load();
        }
        return panel.store;
    },

    initializePanel(cmp) {
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
