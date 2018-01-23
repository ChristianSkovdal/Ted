/*
 * This file is responsible for launching the application. Application logic should be
 * placed in the Admin.Application class.
 */
Ext.Loader.setPath('Aux', 'Auxiliary');
//Ext.Loader.setPath('Ted.Enum', 'Auxiliary');
//Ext.Loader.setPath('Util', 'Auxiliary');

Ext.application({
    name: 'Admin',

    extend: 'Admin.Application',

    // Simply require all classes in the application. This is sufficient to ensure
    // that all Admin classes will be included in the application build. If classes
    // have specific requirements on each other, you may need to still require them
    // explicitly.
    //
    requires: [
        'Admin.*',
        'Aux.*',
        'Ted.Enum.*',
        'Util.Msg'
    ]
});
