Ext.define('Ted.Util.AppUtil', {
    singleton: true,

    alternateClassName: ['App'],

    getUser() {
        return Admin.getApplication().getMainView().getViewModel().get('user');
    }
});