Ext.define('Admin.view.controls.PanelHostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panelhost',

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
        'panelhost > component[getFields]': {
            initialize: function (cmp) {
                //let modelName = this.defineDataModel(cmp);
                cmp.setStore(this.getStore(cmp));
            }
        },
        '*': {
            modelChange: function () {
                this.getView().store.destroy();
                this.getView().store = null;
                this.getView().setStore(this.getStore());
            }
        }

    },

    defineDataModel(cmp) {
        //assert(this.getView().getItemId());
        let modelName = 'Ted.data.DynamicModel.' + Util.createCmpGuid();// this.getView().getItemId();
        //let modelName = 'Ted.data.DynamicModel.' + this.getView().getItemId();

        let modelFields = [];
        let fields = cmp.getFields();
        let index=1
        for (let f of fields) {
            modelFields.push({
                name: 'col'+ index++,
                type: f.type
            });
        }

        Ext.define(modelName, {
            extend: 'Ext.data.Model',

            fields: modelFields
        });

        return modelName;
    },


    getStore(cmp) {

        var panel = this.getView();
        //cmp = cmp || this.getView();

        if (!panel.store) {

            //assert(modelName, 'modelName missing');

            panel.store = Ext.create('Ext.data.Store', {
                autoLoad: false,
                autoSync: true,
                model: this.defineDataModel(cmp || panel),

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
                    let url = 'api/data/table/create/' + user.token + '/' + panel.dataSourceId;
                    AjaxUtil.post(url, {
                        columns: panel.getFields(),
                        masterTableId: panel.masterTableId
                    });
                }
                else {
                    oldHandler(err);
                }
            };

            panel.store.load({
                //callback: function () {
                //    debugger;

                //}
            });
        }
        return panel.store;
    },

    stealButtons(cmp) {
        let tb = this.getView().getTbar();
        let buttons = cmp.getHostButtons();
        if (buttons.length === 0) {
            tb.hide();
        }
        else {
            for (let b of buttons) {
                if (!this[b.handler]) {
                    this[b.handler] = cmp.getController()[b.handler];
                }
            }
            tb.add(buttons);
        }
    },

    onRemove(panel) {

        let page = panel.up('container[pageId!=null]');
        let vm = this.getViewModel();
        let token = vm.get('user.token');

        panel.getParent().remove(panel);
        panel.destroy();
        let objTree = page.getComponentTree();


        AjaxUtil.put('/api/page/' + token + '/' + page.pageId, {
            json: JSON.stringify({
                items: objTree
            })
        });
    },

    onAddSomething(panel) {
        
        // Add linked table

    },

    browseButtonClick() {
        debugger;
        $('input[type=file]').trigger('click');

    }


});
