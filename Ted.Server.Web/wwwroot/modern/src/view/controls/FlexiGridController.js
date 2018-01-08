Ext.define('Admin.view.controls.FlexiGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.flexigrid',


    control: {
        '*': {
            painted: function (cmp) {
                //debugger;
            }
        }
    },

    getMenu: function () {
        if (!this.menu) {
            this.menu = Ext.widget('menu', {
                items: [
                    {
                        text: 'Column'
                    },
                    {
                        text: 'Toolbar',
                    }

                ]
            });
        }
        return this.menu;
    },

    onAdd(e, el, owner, tool) {
        debugger;
        this.getMenu().showBy(tool);
    }
});
