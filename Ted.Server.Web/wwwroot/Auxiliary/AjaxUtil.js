Ext.define('Aux.AjaxUtil', {
    singleton: true,

    alternateClassName: ['AjaxUtil'],

    handleFailure(f, r) {
        if (f)
            f(r);
        else
            Ext.Msg.alert('Communication Error', r.message || 'Undefined Error');
    },

    handleReason(reason, failureFn) {

        if (reason.responseText) {
            var rsp = JSON.parse(reason.responseText);
            if (rsp && !rsp.success) {
                this.handleFailure(failureFn, rsp)
            }
            else {
                Ext.Msg.alert('Communication Error', 'Error: ' + reason.responseText);
            }
        }
        else {
            if (reason.message)
                Ext.Msg.alert('Communication Error', reason.message);
            else
                Ext.Msg.alert('Communication Error', 'Unknow Error');
        }

    },

    post(url, json, successFn, failureFn, waitMsg) {

        var me = this;

        Ext.Viewport.mask({
            xtype: 'loadmask',
            message: waitMsg || 'Loading...'
        });

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
            Ext.Viewport.unmask();
        }).otherwise(function (reason) {
            me.handleReason(reason, failureFn);
        });
    },



    get(url, successFn, failureFn, waitMsg) {

        var me = this;

        Ext.Viewport.mask({
            xtype: 'loadmask',
            message: waitMsg || 'Loading...'
        });

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
            Ext.Viewport.unmask();
        }).otherwise(function (reason) {
            me.handleReason(reason, failureFn);
        });
    }


});