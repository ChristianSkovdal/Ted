Ext.define('Aux.StoreExtensions', {}, () => {

    Ext.override(Ext.data.Store, {

        findCaseInsensitive(column, value) {
            // Does it exist already with this name
            function containsCaseInsensitive(store, column, value) {
                var re = new RegExp('^' + value + '$', 'i');
                return function (rec) {
                    return re.test(rec.get(column));
                }
            }

            return this.findBy(containsCaseInsensitive(this, column, value)) >= 0;
        }

    });

});