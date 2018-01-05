Ext.define('Admin.view.profile.WorkspaceCanvas', {
    extend: 'Admin.view.profile.UserProfileBase',
    xtype: 'workspacecanvas',

    cls: 'userProfile-container dashboard',
    scrollable: 'y',

    defaults: {
        shadow: true,
        userCls: 'big-100 dashboard-item'
    },

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
