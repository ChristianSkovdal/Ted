Ext.define('Admin.view.dialogs.BaseDlgController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.basedlg',

    onTextFieldFocus(cmp) {
		Ext.defer(f => cmp.select(), 100);
	},

	onOK() {
		let vm = this.getViewModel();
        this.getView().fireEvent('ok', this.getView(), vm.data);
	},

	onCancel() {
		this.getView().destroy();
    },

    onInitialize() {
        this.keyNav = Ext.create('Ext.util.KeyNav', {
            target: this.getView(), 
            enter: this.onOK,
            scope: this
        });
    }
});
