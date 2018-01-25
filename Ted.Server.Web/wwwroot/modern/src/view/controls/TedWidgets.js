Ext.define('Admin.view.controls.TedTextField', {
    extend: 'Ext.field.Text',
    xtype: 'tedtextfield',


    listeners: {
        specialkey: function (field, event, eOpts) {
            
            //if (event.getKey() == event.TAB) {
            //    console.log('TAB');
            //} else if (event.getKey() == event.ENTER) {
            //    console.log('ENTER');
            //}
        }
    }
});

Ext.define('Admin.view.controls.TedNumberField', {
    extend: 'Ext.field.Number',
    xtype: 'tednumberfield',


});

Ext.define('Admin.view.controls.TedControlsInitializer', {}, () => {

    var props = {

        getSerializableProperties() {
            return ['flex', 'itemId', 'label'];
        },

    };

    Ext.override(Admin.view.controls.TedTextField, props);
    Ext.override(Admin.view.controls.TedNumberField, props);

});
