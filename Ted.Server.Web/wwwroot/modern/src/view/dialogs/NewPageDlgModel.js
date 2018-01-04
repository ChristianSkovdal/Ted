Ext.define('Admin.view.dialogs.NewPageDlgModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.newpagedlg',

	data: {
        page: {}
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
