Ext.define('Admin.view.dialogs.NewWorkspaceDlgController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.newworkspacedlg',

	onFocus(cmp) {
		let mainVm = Admin.app.getMainView().getViewModel();
		let vm = this.getViewModel();
		vm.set('ws', {
			name: 'My new workspace',
			description: 'New workspace created by ' + mainVm.get('user').fullName
		});
		Ext.defer(f => cmp.select(), 100);
	},

	onOK() {
		//this.getView().destroy();
		let vm = this.getViewModel();
		this.getView().fireEvent('ok', this.getView(), vm.get('ws'));
	},


	onCancel() {
		this.getView().destroy();
	}
});
