Ext.define('Aux.AjaxUtil', {
    singleton: true,

    alternateClassName: ['AjaxUtil'],

    handleFailure(f, r) {
        if (f)
            f(r);
        else
            Ext.Msg.alert('Error', r.message);
    },

    handleReason(reason) {

        if (reason.responseText) {
            var rsp = JSON.parse(reason.responseText);
            if (rsp && !rsp.success) {
                me.handleFailure(failureFn, rsp)
            }
            else {
                Ext.Msg.alert('Error', 'Error: ' + reason.responseText);
            }
        }
        else {
            if (reason.message)
                Ext.Msg.alert('Error', reason.message);
            else
                Ext.Msg.alert('Error', 'Unknow Error');
        }

    },

    post(url, json, successFn, failureFn) {

        var me = this;

        Ext.Ajax.request({
            url: url,
            method: 'POST',
            jsonData: json,
        }).then(function (response) {
            var rsp = JSON.parse(response.responseText);

            if (rsp.success) {
                if (successFn) {
                    successFn(rsp);
                }
            }
            else {
                me.handleFailure(failureFn, rsp)
            }

        }).always(function () {
            // clean-up logic, regardless the outcome
        }).otherwise(function (reason) {
            me.handleReason(reason);        
        });
    },



    get(url, successFn, failureFn) {

        var me = this;

        Ext.Ajax.request({
            url: url,
            method: 'GET',
        }).then(function (response) {
            var rsp = JSON.parse(response.responseText);

            if (rsp.success) {
                if (successFn) {
                    successFn(rsp);
                }
            }
            else {
                me.handleFailure(failureFn, rsp)
            }

        }).always(function () {
            // clean-up logic, regardless the outcome
        }).otherwise(function (reason) {
            me.handleReason(reason);
        });
    }


});