Ext.define('Admin.view.dialogs.BaseDlg', {
	extend: 'Ext.Dialog',
    xtype: 'basedlg',

    controller: 'basedlg',

	width: 400,
	closable: true,
	defaultFocus: 'textfield',

    listeners: {
        initialize: 'onInitialize'
    },

	buttons: {
		ok: 'onOK',
		cancel: 'onCancel'
	}
});
