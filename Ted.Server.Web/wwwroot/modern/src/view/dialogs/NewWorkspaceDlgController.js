Ext.define('Admin.view.dialogs.NewWorkspaceDlgController', {
    extend: 'Admin.view.dialogs.BaseDlgController',
    alias: 'controller.newworkspacedlg',

    //onFocus(cmp) {
    //	let mainVm = Admin.app.getMainView().getViewModel();
    //	let vm = this.getViewModel();
    //	vm.set('ws', {
    //		name: 'My new workspace',
    //		description: 'New workspace created by ' + mainVm.get('user').fullName
    //	});
    //	Ext.defer(f => cmp.select(), 100);
    //},

    onTextFieldFocus(cmp) {
        let mainVm = Admin.app.getMainView().getViewModel();
        let vm = this.getViewModel();
        vm.set('ws', {
            name: 'My new workspace',
            description: 'New workspace created by ' + mainVm.get('user').fullName
        });
        this.callParent(arguments);
    }
});
