Ext.define('Admin.view.controls.JSEditor', {
    extend: 'Ext.Container',
    xtype: 'jseditor',

    html: '<div id="editor">title: "Hello, world!"</div>',

    listeners: {
        painted: function () {
            this.editor = ace.edit("editor");

            this.editor.setOptions({
                enableBasicAutocompletion: true, // the editor completes the statement when you hit Ctrl + Space
                enableLiveAutocompletion: true, // the editor completes the statement while you are typing
                showPrintMargin: false, // hides the vertical limiting strip
                maxLines: Infinity,
                fontSize: "100%" // ensures that the editor fits in the environment
            });
            // defines the style of the editor
            this.editor.setTheme("ace/theme/chrome");
            // hides line numbers (widens the area occupied by error and warning messages)
            this.editor.renderer.setOption("showLineNumbers", true);
            // ensures proper autocomplete, validation and highlighting of JavaScript code
            this.editor.getSession().setMode("ace/mode/javascript");

        }

    },

    getEditor() {
        return this.editor;
    }

});