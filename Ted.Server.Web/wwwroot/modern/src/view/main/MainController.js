Ext.define('Admin.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'Ext.MessageBox'
    ],

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'setCurrentView'
            }
        }
    },

    routes: {
        ':node': 'setCurrentView'
    },

    config: {
        showNavigation: true
    },

    collapsedCls: 'main-nav-collapsed',

    onNavigationItemClick() {
        // The phone profile's controller uses this event to slide out the navigation
        // tree. We don't need to do anything but must be present since we always have
        // the listener on the view...
    },

    onNavigationTreeSelectionChange(tree, node) {
        debugger;
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },

    //onSwitchToClassic: function () {
    //	Ext.Msg.confirm('Switch to Classic', 'Are you sure you want to switch toolkits?',
    //		'onSwitchToClassicConfirmed', this);
    //},

    //onSwitchToClassicConfirmed: function (choice) {
    //	if (choice === 'yes') {
    //		var obj = Ext.Object.fromQueryString(location.search);

    //		delete obj.modern;

    //		obj.classic = '';

    //		location.search = '?' + Ext.Object.toQueryString(obj).replace('classic=', 'classic');
    //	} else {
    //		var button = this.lookup('toolkitSwitch');

    //		button.setValue(Ext.isModern ? 'modern' : 'classic');
    //	}
    //},


    onToggleNavigationSize() {
        this.setShowNavigation(!this.getShowNavigation());
    },

    setCurrentView(hashTag) {
        debugger;
        hashTag = (hashTag || '').toLowerCase();

        if (hashTag !== 'login' && hashTag !== 'register') {
            try {
                let me = this;
                let vm = this.getViewModel();
                if (!vm.get('user')) {

                    let loginStr = localStorage.getItem('login_data');
                    if (loginStr) {
                        var login = JSON.parse(loginStr);
                        if (login) {
                            // Always return from here as it is checking async
                            AjaxUtil.post('api/user/login',
                                login,
                                (result) => {
                                    vm.set('user', result.data);
                                    // The next page to show: either the workspace list or the 
                                    // specified workspace

                                    // There is specified a workspace in the url
                                    if (hashTag.startsWith('ws:')) {
                                        me.redirectTo(hashTag, true);
                                    }
                                    else {
                                        me.redirectTo('workspacelist', true);
                                    }

                                    return;
                                },
                                () => {
                                    me.redirectTo('login');
                                    return;
                                }
                            );
                            return;
                        }
                        else {
                            me.redirectTo('login');
                            return;
                        }
                    }
                    else {
                        me.redirectTo('login');
                        return;
                    }
                }
                //else {
                //    //me.loadWorkspaces();
                //    //me.getView().fireEvent('authenticated', me.getView(), vm.get('user'));
                //}
            } catch (e) {
                Ext.Msg.alert('Exception', e.message);
                me.redirectTo('login');
                return;
            }
        }

        var view = this.getView(),
            navigationTree = this.lookup('navigationTree'),
            store = navigationTree ? navigationTree.getStore() : null,
            node = store.findNode('routeId', hashTag) ||
                store.findNode('viewType', hashTag),
            item = view.child('component[routeId=' + hashTag + ']');

        if (!item) {
            
            if (hashTag.startsWith('ws:')) {
                //item = {
                //    xtype: 'workspace',
                //    routeId: hashTag
                //};

                let wsid = hashTag.split(':')[1];
                let vm = this.getViewModel();

                AjaxUtil.get('/api/workspace/' + vm.get('user.token') + '/' + wsid, rsp => {
                    let ws = rsp.data;
                    vm.set('workspace', ws);

                    let navData = JSON.parse(ws.componentTree);
                    let store = navigationTree.getStore();
                    let root = {
                        expanded: true,
                        children: [navData]
                    };
                    
                    store.setRoot(root);
                    navigationTree.setSelection(root);

                });

            }
            else {
                item = {
                    xtype: hashTag,
                    routeId: hashTag
                };
            }
        }

        if (item) {
            view.setActiveItem(item);

            if (node) {
                navigationTree.setSelection(node);
            }
        }
    },

    updateShowNavigation(showNavigation, oldValue) {
        // Ignore the first update since our initial state is managed specially. This
        // logic depends on view state that must be fully setup before we can toggle
        // things.
        //
        if (oldValue !== undefined) {
            var me = this,
                cls = me.collapsedCls,
                logo = me.lookup('logo'),
                navigation = me.lookup('navigation'),
                navigationTree = me.lookup('navigationTree'),
                rootEl = navigationTree.rootItem.el;

            navigation.toggleCls(cls);
            logo.toggleCls(cls);

            if (showNavigation) {
                // Restore the text and other decorations before we expand so that they
                // will be revealed properly. The forced width is still in force from
                // the collapse so the items won't wrap.
                navigationTree.setMicro(false);
            } else {
                // Ensure the right-side decorations (they get munged by the animation)
                // get clipped by propping up the width of the tree's root item while we
                // are collapsed.
                rootEl.setWidth(rootEl.getWidth());
            }

            logo.element.on({
                single: true,
                transitionend: function () {
                    if (showNavigation) {
                        // after expanding, we should remove the forced width
                        rootEl.setWidth('');
                    } else {
                        navigationTree.setMicro(true);
                    }
                }
            });
        }
    },

    toolbarButtonClick: function (btn) {
        var href = btn.config.href;

        this.redirectTo(href);
    },

    editButtonClick(btn) {
        let vm = this.getViewModel();
        vm.set('editMode', !vm.get('editMode'));
    },

    addPageButtonClick() {

        let navigationTree = this.lookup('navigationTree');
        let root = navigationTree.getStore().getRoot();

        root.on('insert', (node, newNode, refNode) => {
            this.redirectTo('tedpage');
        });

        root.insertChild(0, {
            text: 'New Page',
            //href: '#NewPage01',
            iconCls: 'x-fa fa-calendar-plus-o',
            rowCls: 'nav-tree-badge nav-tree-badge-hot',
            viewType: 'tedpage',
            leaf: true
        });
    },

    onWorkspaceViewPainted(workspaceView) {
        let store = workspaceView.getStore();
        let vm = this.getViewModel();
        store.getProxy().setUrl('api/workspace/' + vm.get('user').token);
        store.load();
    },

    //onWorkspacesAuthenticated(wsPage, user) {
    //    //debugger;
    //    //console.log(this.getViewModel().get('user').token);
    //    //var view = this.lookupReference('workspaceView');
    //},

    signoutButtonClick() {
        Ext.Msg.confirm('Sign Out', 'Are you sure?', (answer) => {
            if (answer === 'yes') {
                localStorage.setItem('login_data', '');
                this.redirectTo('login');
            }
        });
    },

    addWorkspaceButtonClick() {

        var dialog = Ext.create({
            xtype: 'newworkspacedlg',
        });

        dialog.show();

        dialog.on('ok', (cmp, ws) => {

            var view = this.lookupReference('workspaceView');
            var store = view.getStore();
            let vm = this.getViewModel();

            if (store.findCaseInsensitive('name', ws.name)) {
                Ext.Msg.alert('Workspace', 'A workspace with that name already exist', f => dialog.down('textfield').focus());
            }
            else {
                store.insert(0, ws);
                store.sync({
                    callback(batch, opt) {
                        vm.set('selectedWorkspace', store.first());
                        dialog.destroy();
                    }
                });
            }
        });
    },


    refreshWorkspaceButtonClick() {
        var view = this.lookupReference('workspaceView');
        var store = view.getStore();
        store.load();
    },

    workspaceDblTap(view, location, options) {
        this.openWorkspace(location.record.id);
    },

    openWorkspaceButtonClick() {
        let vm = this.getViewModel();
        this.openWorkspace(vm.get('selectedWorkspace').id);
    },

    openWorkspace(wsid) {
        this.redirectTo('ws:' + wsid);
    },

    deleteWorkspaceButtonClick() {
        Ext.Msg.confirm('Delete Workspace', 'Are you sure', answer => {

            if (answer === 'yes') {
                var view = this.lookupReference('workspaceView');
                var store = view.getStore();
                let vm = this.getViewModel();
                let record = vm.get('selectedWorkspace');
                store.remove(record);
                store.sync({
                    callback(batch, opt) {
                        if (store.count() > 0) {
                            vm.set('selectedWorkspace', store.first());
                        }
                    }
                });
            }
        });
    },

    //initViewModel(viewModel) {

    //    viewModel.bind({
    //        bindTo: '{user}',
    //        deep: true
    //    },
    //        user => {
    //            if (user) {
    //                //debugger;
    //                // user & token has changed. We are logged in and ready to either load all workspaces
    //                // or one specific one if it is specified. We do that by redirecting to the page.

    //                //let workspaceView = this.lookupReference('workspaceView');
    //                //let store = workspaceView.getStore();
    //                //store.getProxy().setUrl('api/workspace/' + user.token);
    //                //store.load();

    //            }
    //        });
    //}


    workspaceInitialize(wsView) {
        //debugger;
        //assert(wsView.routeId);
        //assert(wsView.routeId.split(':') == 2);

        let wsid = wsView.routeId.split(':')[1];
        let vm = this.getViewModel();

        AjaxUtil.get('/api/workspace/'+vm.get('user.token')+'/'+wsid, rsp => {
            debugger
            let ws = rsp.data;
            vm.set('workspace', ws);
        });

    }
});
