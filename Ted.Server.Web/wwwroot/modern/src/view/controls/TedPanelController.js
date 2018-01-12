Ext.define('Admin.view.controls.TedPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tedpanel',

    control: {
        'component[hostedItem=true]': {
            
            initialize: function (cmp) {
                this.stealButtons(cmp);
            }
        },

    },

    stealButtons(cmp) {
        if (cmp.getButtons) {
            let tb = this.getView().getTbar();
            let buttons = cmp.getButtons();
            for (let b of buttons) {
                if (!this[b.handler]) {
                    this[b.handler] = cmp.getController()[b.handler];
                }
            }
            tb.add(buttons);
        }
    },

    requires: []
    
    
});
