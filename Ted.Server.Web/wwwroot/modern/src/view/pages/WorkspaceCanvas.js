Ext.define('Admin.view.profile.WorkspaceCanvas', {
    //extend: 'Admin.view.profile.UserProfileBase',
    extend: 'Ext.Container',
    xtype: 'workspacecanvas',

    cls: 'userProfile-container dashboard',
    scrollable: 'y',
    layout: 'hbox',
    // style: 'background:white;',


    defaults: {
        shadow: true,
        margin: '0 10 10 5',
        flex: 1
        //userCls: 'big-100 dashboard-item'
    },

    getComponentTree() {

        recursivelyWalkHierachy = function (cmp, array) {

            if (cmp.getSerializableProperties) {
                let propNames = cmp.getSerializableProperties();
                let obj = {};

                for (let pname of propNames) {

                    //let current = cmp;
                    //let currentObj = obj;

                    //let tokens = pname.split('.');
                    //if (tokens.length == 2) {
                    //    let prop = tokens[0];
                    //    let propprop = tokens[1];
                    //    debugger;
                    //    current = current['_' + prop];
                    //    assert(current);
                    //    currentObj[prop] = {};
                    //    currentObj = currentObj[prop];
                    //    pname = propprop;
                    //}

                    if (pname.startsWith('.')) {
                        pname = pname.substr(1);
                        let fnName = 'get' + Util.capitalizeFirstLetter(pname) + 'Config';
                        let cfg = cmp[fnName]();
                        if (cfg) {
                            obj[pname] = cfg;
                        }
                    }
                    else {

                        if (cmp[pname]) {
                            obj[pname] = cmp[pname];
                        }
                        else {
                            let propname = '_' + pname;
                            if (cmp[propname]) {
                                obj[pname] = cmp[propname];
                            }
                        }
                    }

                }
                
                obj.xtype = cmp.xtype;
                array.push(obj);

                if (cmp.getChildren) {

                    if (cmp.getColumns) {
                        obj.columns = [];
                    }
                    else {
                        obj.items = [];
                    }

                    for (let child of cmp.getChildren()) {
                        recursivelyWalkHierachy(child, obj.items || obj.columns);
                    }

                }
            }
        }

        let root = [];

        for (let child of this.items.items) {
            recursivelyWalkHierachy(child, root);
        }

        return root;
    }

    //items: [{
    //    xtype: 'profileshare',
    //    userCls: 'big-100 small-100 dashboard-item'
    //}, {
    //    xtype: 'profilesocial'
    //}, {
    //    xtype: 'profiledescription'
    //}, {
    //    xtype: 'profilenotifications'
    //}, {
    //    xtype: 'profiletimeline'
    //}]
});
