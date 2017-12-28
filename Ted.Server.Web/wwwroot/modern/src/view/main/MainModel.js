Ext.define('Admin.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        editMode: true,
        ready: false,
        token: '',

        email: '',
        password: '',
        fullname: '',
        rememberMe: false
    }
});
