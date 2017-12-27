/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Ted.Application',

    name: 'Ted',

    requires: [
        // This will automatically load all classes in the Ted namespace
        // so that application classes do not need to require each other.
        'Ted.*'
    ],

    // The name of the initial view to create.
    mainView: 'Ted.view.main.Main'
});
