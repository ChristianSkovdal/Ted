Ext.define('Admin.view.dialogs.NewWorkspaceDlgModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.newworkspacedlg',

	data: {
		name: {}
	}

	//formulas: {

	//	newWorkspaceName: {
	//		bind: {
	//			bindTo: '{name}',
	//			deep: true
	//		},
	//		get: function (rec) {
	//			var mm = Admin.app.getMainView().getViewModel();
	//			return 'New workspace created by ' + mm.get('user').fullName;
	//		}
	//	}
	//}
});
