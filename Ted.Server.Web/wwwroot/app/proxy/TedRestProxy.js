Ext.define('Admin.proxy.TedRestProxy', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.tedproxy',

    appendId: true,

    errorHandler(errObj) {
        msg = errObj.message;
        return msg || JSON.stringify(errObj);
    },

    reader: {
        type: 'json',
        rootProperty: 'data'
    },
    writer: {
        type: 'json',
        writeRecordId: false,
        writeAllFields: false
    },
    listeners: {
        exception: function (proxy, response, operation) {
            let msg = 'Unknown Error';
            if (response && response.responseText) {
                var errObj = JSON.parse(response.responseText);
                if (errObj && !errObj.success) {
                    msg = this.errorHandler(errObj);
                }
                else {
                    msg = response.responseText;
                }
            }
            else if (operation && operation.error) {
                msg = 'Error Code ' + operation.error.status + ' ' + operation.error.statusText;
            }

            if (msg) {
                Ext.Msg.alert('Data Error', msg);
            }
            
        }
    }
});