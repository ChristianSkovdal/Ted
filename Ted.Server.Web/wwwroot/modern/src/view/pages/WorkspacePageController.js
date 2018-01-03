Ext.define('Admin.view.pages.WorkspacePageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workspacepage',

    requires: [
        'Ext.MessageBox'
    ],

    listen: {
        //controller: {
        //    '#': {
        //        unmatchedroute: 'setCurrentView'
        //    }
        //}
    },

    //config: {
    //    showNavigation: true
    //},

    workspaceInitialize(wsView) {
        debugger;
        //assert(wsView.routeId);
        //assert(wsView.routeId.split(':') == 2);



    }
});
