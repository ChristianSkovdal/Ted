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

    //assert(condition, msg) {
    //    if (!condition)
    //        Ext.raise(msg || 'Assertion!!!!');
    //}
});