Ext.define('Admin.model.User', {
    extend: 'Admin.model.Base',

    fields: [
        {
            name: 'fullname'
        },
        {
            name: 'email'
        },
        {
            name: 'token'
        }
    ]
});
