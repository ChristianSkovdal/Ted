Ext.define('Admin.view.pages.TedPage', {
    extend: 'Ext.Container',
    xtype: 'tedpage',

    requires: [
        'Ext.layout.VBox'
    ],

    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    },

    items: [{
        cls: 'blank-page-container',
        html: '<div class=\'fa-outer-class\'><span class=\'x-fa fa-calendar-plus-o\'></span></div>' +
            '<h1>New Page</h1><span class=\'blank-page-text\'><a href="#">Click here to add components</a></span>'
    }]
});
