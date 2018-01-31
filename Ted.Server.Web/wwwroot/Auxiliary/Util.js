Ext.define('Aux.Util', {
    singleton: true,

    alternateClassName: ['Util'],

    createCmpGuid() {
        return Util.createGuid('',true);
    },

    createGuid(separator, charOnly) {
        function _p8(s) {
            let p = (Math.random().toString(16) + "000000000").substr(2, 8);
            separator = separator || '';
            return s ? separator + p.substr(0, 4) + separator + p.substr(4, 4) : p;
        }


        if (charOnly) {
            let g='';
            const src = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            for (var i = 0; i < 16; i++) {
                g += src.substr(Math.random() * 51, 1);
            }
            return g;
        }
        else {
            return _p8() + _p8(true) + _p8(true) + _p8();
        }
        
    },

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    bytesToSize (bytes) {
        var kilobyte = 1024;
        var megabyte = kilobyte * 1024;
        var gigabyte = megabyte * 1024;
        var terabyte = gigabyte * 1024;

        let precision = 0;
        if (bytes > megabyte) {
            precision=1
        }

        if ((bytes >= 0) && (bytes < kilobyte)) {
            return bytes + ' B';

        } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
            return (bytes / kilobyte).toFixed(precision) + ' KB';

        } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
            return (bytes / megabyte).toFixed(precision) + ' MB';

        } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
            return (bytes / gigabyte).toFixed(precision) + ' GB';

        } else if (bytes >= terabyte) {
            return (bytes / terabyte).toFixed(precision) + ' TB';

        } else {
            return bytes + ' B';
        }
    }

    //assert(condition, msg) {
    //    if (!condition)
    //        Ext.raise(msg || 'Assertion!!!!');
    //}
});