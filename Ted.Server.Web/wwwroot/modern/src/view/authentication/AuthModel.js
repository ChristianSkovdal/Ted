Ext.define('Admin.view.authentication.AuthModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.auth',

    data: {
        email: '',
        password: '',
        fullname: '',
        rememberMe:false
    }
});
