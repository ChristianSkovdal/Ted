Ext.define('Aux.Util', {
    singleton: true,

    alternateClassName: ['Util'],

    createGuid(separator) {
        function _p8(s) {
            let p = (Math.random().toString(16) + "000000000").substr(2, 8);
            separator = separator || '';
            return s ? separator + p.substr(0, 4) + separator + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }
});