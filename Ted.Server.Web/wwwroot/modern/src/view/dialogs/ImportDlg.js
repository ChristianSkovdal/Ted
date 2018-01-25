Ext.define('Admin.view.dialogs.ImportDlg', {
    extend: 'Ext.Dialog',
	xtype: 'importdlg',

    resizeable: true,
    width: 800,
    height: 400,
    layout: 'fit',

    maximizable: true,

    buttons: {
        cancel: function () {  // standard button (see below)
            this.up('dialog').destroy();
        },
        import: {
            text: 'Import',
            handler: 'onStartImport',
            weight: 200
        }
    }

});
