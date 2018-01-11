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

        recursivelyWalkHierachy = function (cmp, obj) {

            if (cmp.getSerializableProperties) {
                debugger;
                let propNames = cmp.getSerializableProperties();
                for (let pname of propNames) {
                    obj[pname] = cmp['_' + pname];
                }

                obj.xtype = cmp.xtype;

                let isGrid = cmp.getColumns();
                let children = cmp.getColumns() || cmp.getItems();
                let collection;
                if (isGrid) {
                    collection = obj.columns = [];
                }
                else {
                    collection = obj.items = [];
                }

                for (let child of children) {
                    recursivelyWalkHierachy(child, collection);
                }
            }
        }

        let root = [];
        for (let child of this.getItems()) {
            let item = {};
            root.push(item);
            recursivelyWalkHierachy(child, item);
        }
        
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
