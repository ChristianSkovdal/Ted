Ext.define('Admin.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        editMode: true,
        ready: false,
        user: null,

        email: '',
        password: '',
        fullname: '',
        rememberMe: false
    },

    stores: {
        workspaces: {

            model: 'Admin.model.Workspace',

            autoLoad: false,
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                listeners: {
                    exception: function (proxy, response, operation) {
                        debugger;
                        let msg = 'Unknown Error';
                        if (response && response.responseText) {
                            var errObj = JSON.parse(response.responseText);
                            if (errObj && !errObj.success && errObj.message) {
                                msg=errObj.message;
                            }
                            else {
                                msg = resp.responseText;
                            }
                        }
                        else if (operation && operation.error) {
                            msg = 'Error Code '+operation.error.status+' '+operation.error.statusText;
                        }

                        Ext.Msg.alert('Data Error', msg);
                    }
                }
            }
        },
    }
});
