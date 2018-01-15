Ext.define('Ted.Enum.ExceptionCodes',
{
Generic : 0,

Authentication : 100,
NotSuperUser:101,
UserExist : 102,
PageNotFound : 103,
TableNotFound : 104,
ColumnExist : 105
}
);
var ExceptionCodes = new Ext.create('Ted.Enum.ExceptionCodes');
