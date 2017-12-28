Ext.define('Admin.view.authentication.AuthBase', {
    extend: 'Ext.Panel',

    controller: 'auth',
    //viewModel:'auth',

    requires: [
        'Ext.layout.VBox',
        'Admin.view.authentication.AuthModel'
    ],

    baseCls: 'auth-locked',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    }
});
