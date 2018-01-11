Ext.define('Admin.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'Ext.MessageBox',
        'Aux.Util'
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
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },


    onToggleNavigationSize() {
        this.setShowNavigation(!this.getShowNavigation());
    },

    setCurrentView(hashTag) {


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
                                    if (hashTag.startsWith('page:')) {
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

        if (item && item.reloadItem) {
            item = null;
        }

        let me = this;
        let vm = this.getViewModel();

        vm.set('showWorkspaceTools', hashTag.startsWith('page:'));


        if (!item) {

            //                 Ext.Msg.confirm('Leave workspace', 'Are you sure you want to leave the current workspace?', answer => {
            //                     if (answer === 'yes') {
            //                         vm.set('showWorkspaceTools', false);
            //                         vm.set('workspace', null);
            //                         loadWorkspace();
            //                     }
            //                 });

            if (hashTag.startsWith('page:')) {

                let pageid = hashTag.split(':')[1];
                let existingWS = vm.get('workspace');
                let currentWsId = existingWS ? existingWS.id : -1;

                AjaxUtil.get('/api/page/' + vm.get('user.token') + '/' + pageid + '/' + currentWsId,
                    rsp => {
                        let page = rsp.data;
                        item = JSON.parse(page.json);
                        item.json = page.json;

                        item.xtype = item.xtype || 'workspacecanvas';
                        item.routeId = hashTag;
                        
                        view.setActiveItem(item);

                        if (rsp.tree) {

                            vm.set('workspace', page.workspace);
                            vm.set('showWorkspaceTools', true);

                            //let navData = JSON.parse(page.workspace.componentTree);
                            let root = navigationTree.getStore().getRoot();

                            let defaults = {
                                leaf: true
                            };

                            root.removeAll();
                            for (let child of rsp.tree) {
                                Ext.applyIf(child, defaults);
                                root.appendChild(child);
                            }
                            navigationTree.setSelection(root.findChild('routeId', hashTag));
                        }

                    },
                    err => {
                        Ext.Msg.alert('Communication Error', err.message, () => {
                            me.redirectTo('login');
                        });
                    }
                );
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

    //editButtonClick(btn) {
    //    let vm = this.getViewModel();
    //    vm.set('editMode', !vm.get('editMode'));
    //},

    addPageButtonClick() {

        let vm = this.getViewModel();
        let user = vm.get('user');
        let workspace = vm.get('workspace');
        let me = this;

        var dialog = Ext.create({
            xtype: 'newpagedlg',
        });

        dialog.show();

        dialog.on('ok', (cmp, data) => {
            let navigationTree = this.lookup('navigationTree');
            var store = navigationTree.getStore();

            if (store.findCaseInsensitive('text', data.page.name)) {
                Ext.Msg.alert('Page', 'A page with that name already exist', f => dialog.down('textfield').focus());
            }
            else {

                AjaxUtil.post('/api/page/' + user.token + '/' + workspace.id,
                    {
                        text: data.page.name,
                        iconCls: 'x-fa fa-calendar-plus-o'
                    },
                    rsp => {
                        let page = rsp.data;
                        item = JSON.parse(page.json);

                        let view = me.getView();
                        view.setActiveItem(item);

                        let defaults = {
                            leaf: true
                        };

                        Ext.applyIf(page, defaults);
                        page.routeId = "page:" + page.id;

                        let root = navigationTree.getStore().getRoot();
                        let node = root.appendChild(page);
                        navigationTree.setSelection(node);

                        //me.redirectTo(item.routeId);

                        dialog.destroy();
                    }
                );
            }
        });
    },

    onWorkspaceViewPainted(workspaceView) {
        let store = workspaceView.getStore();
        let vm = this.getViewModel();
        store.getProxy().setUrl('api/workspace/' + vm.get('user').token);
        store.load();
    },

    //onWorkspacesAuthenticated(wsPage, user) {
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

        dialog.on('ok', (cmp, data) => {

            let view = this.lookupReference('workspaceView');
            let store = view.getStore();
            let vm = this.getViewModel();
            let me = this;

            if (store.findCaseInsensitive('name', data.ws.name)) {
                Ext.Msg.alert('Workspace', 'A workspace with that name already exist', f => dialog.down('textfield').focus());
            }
            else {
                store.insert(0, data.ws);
                store.sync({
                    callback(batch, opt) {
                        vm.set('selectedWorkspace', store.first());
                        dialog.destroy();
                        me.redirectTo('page:' + store.first().get('startPageId'));
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
        this.openWorkspace(location.record);
    },

    openWorkspaceButtonClick() {
        let vm = this.getViewModel();
        this.openWorkspace(vm.get('selectedWorkspace'));
    },

    openWorkspace(ws) {
        this.redirectTo('page:' + ws.get('startPageId'));
    },

    deleteWorkspaceButtonClick() {
        Ext.Msg.confirm('Delete Workspace', 'Are you sure?', answer => {

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
    //                // user & token has changed. We are logged in and ready to either load all workspaces
    //                // or one specific one if it is specified. We do that by redirecting to the page.

    //                //let workspaceView = this.lookupReference('workspaceView');
    //                //let store = workspaceView.getStore();
    //                //store.getProxy().setUrl('api/workspace/' + user.token);
    //                //store.load();

    //            }
    //        });
    //}


    //workspaceInitialize(wsView) {
    //    //assert(wsView.routeId);
    //    //assert(wsView.routeId.split(':') == 2);

    //    let wsid = wsView.routeId.split(':')[1];
    //    let vm = this.getViewModel();

    //    AjaxUtil.get('/api/workspace/' + vm.get('user.token') + '/' + wsid, rsp => {

    //        let ws = rsp.data;
    //        vm.set('workspace', ws);
    //    });

    //}

    onWorkspacesPainted() {
        let vm = this.getViewModel();
        vm.set('workspace', null);
        //vm.set('showWorkspaceTools', false);

    },

    gotoWorkspacesButtonClick() {
        this.redirectTo('workspacelist', true);
    },

    addGridButtonClick() {
        let view = this.getView();

        let currentitem = view.getActiveItem();
        let routeId = currentitem.routeId;

        let navigationTree = this.lookup('navigationTree');
        let page = navigationTree.getSelection();
        let vm = this.getViewModel();
        let user = vm.get('user');

        let json = currentitem.json;

        let grid = {
            xtype: 'tedpanel',
            title: 'New Grid Panel',
            itemId: Util.createGuid(),
            items: [
                {
                    xtype: 'tedgrid',
                    columns: [
                        {
                            text: 'First Column',
                            flex: 1,
                            xtype: 'tedcolumn',
                            itemId: Util.createGuid()
                        }
                    ]
                }
            ]
        }

        if (currentitem.xtype === 'placeholder') {
            currentitem.destroy();
            json = JSON.stringify({
                items: [grid]
            });
        }
        else {
            var obj = JSON.parse(json);
            obj.items.push(grid);
            json = JSON.stringify(obj);
        }
        AjaxUtil.put('/api/page/' + user.token + '/' + page.id,
            {
                json: json
            },
            rsp => {
                currentitem.reloadItem = true;
                this.redirectTo(routeId, true);
            },
            rsp => {

                this.redirectTo(routeId, true);
            }
        );

    }


});
