Ext.define('Admin.model.Workspace', {
    extend: 'Admin.model.Base',
	//idProperty: 'foo',

	fields: [
		//{
		//	name: 'id',
		//	allowNull: true
		//},
		{
			name: 'name'
		},
        {
            name: 'description'
        }
    ]
});
