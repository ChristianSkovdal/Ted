Ext.define('Util.Msg', {

    singleton: true,
    alternateClassName: ['Msg'],

    defaultTitle: '',

    warning: function (msg) { this.warning(msg, this.defaultTitle); },
    error: function (msg) { this.error(msg, this.defaultTitle); },
    info: function (msg) { this.info(msg, this.defaultTitle); },


    functionize: function (fn) {
        if (fn) {
            if (!Ext.isFunction(fn) && fn.isComponent) {
                var field = fn;
                fn = function () {
                    field.focus();
                    if (field.xtype == 'textfield') {
                        field.selectText();
                    }
                }
            }
        }
        return fn;
    },


    warning: function (msg, title, fn) {

        Ext.Msg.show({
            title: title || this.defaultTitle,
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING,
            fn: this.functionize(fn)
        });
    },

    error: function (msg, title, fn) {
        Ext.Msg.show({
            title: title || this.defaultTitle,
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR,
            fn: this.functionize(fn)
        });
    },

    info: function (msg, title, fn) {
        Ext.Msg.show({
            title: title || this.defaultTitle,
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO,
            fn: this.functionize(fn)
        });
    },

    question: function (msg, title, func) {
        Ext.Msg.show({
            title: title || this.defaultTitle,
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function (btn, text) {
                if (btn == "yes")
                    func();
            }
        });
    },

    yesNoCancel: function (msg, title, func) {
        Ext.Msg.show({
            title: title || this.defaultTitle,
            msg: msg,
            buttons: Ext.MessageBox.YESNOCANCEL,
            icon: Ext.MessageBox.QUESTION,
            fn: function (btn, text) {
                func(btn);
            }
        });
    },

    confirm: function (msg, title, func) {
        Ext.Msg.show({
            title: title || this.defaultTitle,
            msg: msg,
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.QUESTION,
            fn: function (btn, text) {
                if (btn == "ok")
                    func();
            }
        });
    }

});
