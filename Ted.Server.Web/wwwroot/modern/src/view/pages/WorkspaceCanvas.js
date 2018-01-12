Ext.define('Admin.view.profile.WorkspaceCanvas', {
    extend: 'Admin.view.profile.UserProfileBase',
    xtype: 'workspacecanvas',

    cls: 'userProfile-container dashboard',
    scrollable: 'y',

    defaults: {
        shadow: true,
        userCls: 'big-100 dashboard-item'
    },

    getComponentTree() {

        recursivelyWalkHierachy = function (cmp, array) {

            if (cmp.getSerializableProperties) {
                let propNames = cmp.getSerializableProperties();
                let obj = {};
                for (let pname of propNames) {
                    let propname = '_' + pname;
                    if (cmp[propname]) {
                        obj[pname] = cmp[propname];
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
