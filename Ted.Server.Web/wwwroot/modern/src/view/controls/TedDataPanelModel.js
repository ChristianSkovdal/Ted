Ext.define('Admin.view.controls.TedDataPanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.teddatapanel',

    data: {
        selectedItem: null,
    },

    formulas: {
        
    },

    stores: {
        datasrc: {

            autoLoad: false,
            model: 'Admin.model.FlexRow',

            proxy: {
                url: 'api/data/',
                type: 'tedproxy',
            }

            //autoLoad: false,
            //fields: [
            //    { name: 'col1', type: 'string' },
            //    { name: 'col2', type: 'number' },
            //],
            //data: [
            //    { col1: "msft", date: '2011/04/22', change: 2.43, col2: 61606325, topday: '04/01/2010' },
            //    { col1: "goog", date: '2011/04/22', change: 0.81, col2: 3053782, topday: '04/11/2010' },
            //    { col1: "apple", date: '2011/04/22', change: 1.35, col2: 24484858, topday: '04/28/2010' },
            //    { col1: "sencha", date: '2011/04/22', change: 8.85, col2: 5556351, topday: '04/22/2010' }
            //]

            //let store = Ext.create('Ext.data.Store',
            //    {
            //        autoLoad: false,
            //        model: 'Admin.model.FlexRow',

            //        proxy: {
            //            url: 'api/data/' + vm.get('user').token + '/' + view.dataSourceId,
            //            type: 'tedproxy',
            //        }
            //        //data: [
            //        //    { col1: "msft", col2: '2011/04/03', change: 2.43, volume: 61606325, topday: '04/01/2010' },
            //        //    { col1: "goog", col2: '2011/04/03', change: 0.81, volume: 3053782, topday: '04/11/2010' },
            //        //    { col1: "apple", col2: '2011/04/03', change: 1.35, volume: 24484858, topday: '04/28/2010' },
            //        //    { col1: "sencha", col2: '2011/04/03', change: 8.85, volume: 5556351, topday: '04/22/2010' }
            //        //]

            //    });

            //let proxy = store.getProxy();
            //let oldHandler = proxy.errorHandler;
            //proxy.errorHandler = function (err) {

            //    if (err.code === ExceptionCodes.TableNotFound) {

            //        let url = 'api/data/table/' + user.token + '/' + cmp.dataSourceId;
            //        AjaxUtil.post(url, {
            //            columns: cmp.getColumnsDefinitions()
            //        });
            //    }
            //    else {
            //        oldHandler(err);
            //    }
            //};

        }
    }
});
