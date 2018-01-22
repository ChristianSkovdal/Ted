Ext.define('Admin.view.dialogs.BaseDlgController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.basedlg',


    control: {
        '*': {
            specialkey: 'onSpecialKey'
        }
    },

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


    onSpecialKey: function (field, event, options) {
        if (event.getKey() === event.ENTER) {
            event.stopEvent();
            this.onOK();
        }
    },

    onInitialize() {
        //this.keyNav = Ext.create('Ext.util.KeyNav', {
        //    target: this.getView(), 
        //    enter: this.onOK,
        //    scope: this
        //});
    }
});
