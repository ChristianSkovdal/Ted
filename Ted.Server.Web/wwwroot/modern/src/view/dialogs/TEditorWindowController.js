Ext.define('Admin.view.dialogs.TEditorWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.teditor',

    control: {
        'jseditor': {
            painted: function (editor) {
                editor.getEditor().on('change', delta => this.update());
                this.update();
            }

        }

    },
    
    // onTextFieldFocus(cmp) {
    //    let mainVm = Admin.app.getMainView().getViewModel();
    //    let vm = this.getViewModel();
    //    vm.set('ws', {
    //        name: 'My new workspace',
    //        description: 'New workspace created by ' + mainVm.get('user').fullName
    //    });
    //    this.callParent(arguments);
    //}

    openButtonClick(btn) {
        let vm = this.getViewModel();
        this.openModule(vm.get('selectedModule'));
        
    },

    refreshButtonClick(btn) {
        var view = this.lookupReference('moduleView');
        var store = view.getStore();
        store.load();
    },

    addButtonClick(btn) {

        var dialog = Ext.create({
            xtype: 'basedlg',
            title: 'New Module',

            viewModel: 'teditor',

            width: 400,

            closable: true,
            defaultFocus: 'textfield',
            items: [
                {
                    xtype: 'textfield',
                    label: 'Name',
                    allowWhiteSpace: false,
                    margin: 10,
                    bind: {
                        value: '{module.name}'
                    },
                    listeners: {
                        focus: 'onTextFieldFocus'
                    }
                }
            ]
        });

        dialog.show();

        dialog.on('ok', (cmp, data) => {
            let view = this.lookupReference('moduleView');
            let store = view.getStore();
            let vm = this.getViewModel();
            let me = this;

            if (store.findCaseInsensitive('name', data.module.name)) {
                Ext.Msg.alert('Module', 'A Module with that name already exist', f => dialog.down('textfield').focus());
            }
            else {
                data.module.workspaceId = App.getWorkspace().id;
                store.insert(0, data.module);
                store.sync({
                    callback(batch, opt) {
                        vm.set('selectedModule', store.first());
                        dialog.destroy();
                    }
                });
            }
        });
    },

    deleteButtonClick(btn) {
        Ext.Msg.confirm('Delete Module', 'Are you sure?', answer => {

            if (answer === 'yes') {
                var view = this.lookupReference('moduleView');
                var store = view.getStore();
                let vm = this.getViewModel();
                let record = vm.get('selectedModule');
                store.remove(record);
                store.sync({
                    callback(batch, opt) {
                        if (store.count() > 0) {
                            vm.set('selectedModule', store.first());
                        }
                    }
                });
            }
        });
    },

    onModuleViewPainted(view) {
        let vm = this.getViewModel();
        vm.set('workspace', null);

        let store = view.getStore();
        store.getProxy().setUrl('api/module/' + App.getUser().token + '/' + App.getWorkspace().id);
        store.load();
    },

    moduleDblTap(view, location, options) {

        this.openModule(location.record);
    },

    openModule(module) {
        let vm = this.getViewModel();
        vm.set('module', module);
        this.getView().setActiveItem(1);

    },

    saveButtonClick() {


    },

    update() {
        let js = this.lookupReference('js');
        let player = this.lookupReference('player');

        var code = js.getEditor().getValue();

        let template = 'Ext.define("Christian.MyModule", {' +
            '    extend: "Ext.Panel",' +
            '    xtype: "MyModule",' +
            code +
            '});';

        player.removeAll(true, true);

        try {
            var fn = new Function(template);
            fn();
            player.add({
                xtype: 'MyModule'
            });

        } catch (e) {
            player.add({
                xtype: 'container',
                html: 'Invalid code'
            });
            
        }


    },

    playButtonClick() {
        this.update();
    }


});
