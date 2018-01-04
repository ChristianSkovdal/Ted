Ext.define('Admin.view.dialogs.NewPageDialog', {
    extend: 'Admin.view.dialogs.BaseDlg',
	xtype: 'newpagedlg',

	title: 'New Page',

    controller: 'newpagedlg',
    viewModel: 'newpagedlg',

    requires: [
        'Admin.view.controls.FontAwesomeComboBox'
    ],

	items: [
		{
			xtype: 'textfield',
			label: 'Name',
			margin: 10,
			bind: {
				value: '{page.name}'
			},
			listeners: {
				focus: 'onTextFieldFocus'
			}
        },
        {
            xtype: 'fontawesomecombo',
            label: 'Icon',
			margin: 10,
        }
	],
});
