Ext.define('Aux.ComponentExtensions', {}, () => {
    Ext.override(Ext.Component, {

        upsafe(selector) {
            let cmp = this.up(selector);
            assert(cmp, 'Up(selector) "' + selector + '" did not yield a valid component');
            return cmp;
        },

        downsafe(selector) {
            let cmp = this.down(selector);
            assert(cmp, 'Down(selector) "' + selector + '" did not yield a valid component');
            return cmp;
        }

    });

});