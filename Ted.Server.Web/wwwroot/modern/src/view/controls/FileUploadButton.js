Ext.define('Admin.view.controls.FileUploadButton', {
    extend: 'Ext.Button',
    xtype: 'fileuploadbutton',

    listeners: {
        tap: function (btn) {
            // Destroy and recreate the file field
            let parent = btn.getParent();

            let ff = parent.down('filefield');
            if (ff) {
                ff.destroy();
            }
            //debugger;
            parent.add({
                hidden: true,
                xtype: 'filefield',
                accept: this.accept,
                listeners: {
                    scope: 'controller',
                    change: function (field, filename, oldval, opts) {
                        var file = field.getFiles()[0];
                        let cmp = field.getParent().downsafe('fileuploadbutton');
                        cmp.fireEvent('filePicked', cmp, file);
                    }
                }
            });

            let id = parent.downsafe('filefield').getItemId();
            let input = $('#' + id).find('input[type=file]');
            assert(input.length === 1);
            input.trigger('click');

        }

    }


});
