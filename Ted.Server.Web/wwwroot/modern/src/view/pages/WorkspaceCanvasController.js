Ext.define('Admin.view.pages.WorkspaceCanvasController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workspacecanvas',

    requires: [
        'Ext.MessageBox'
    ],

    control: {
        '*': {
            painted: function (cmp) {
                //debugger;
            }
        }
    },

    //config: {
    //    showNavigation: true
    //},

    //activate(wsView) {
    //    debugger;
    //    let vm = this.getViewModel();
    //    

    //},

    //deactivate(wsView) {
    //    debugger;
    //    let vm = this.getViewModel();
    //    vm.set('showWorkspaceTools', false);
    //},
});
