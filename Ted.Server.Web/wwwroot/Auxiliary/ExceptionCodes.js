Ext.define('Ted.Enum.ExceptionCodes',
    {
        Generic: 0,

        Authentication: 100,
        NotSuperUser: 101,
        UserExist: 102,
    }
);

var ExceptionCodes = new Ext.create('Ted.Enum.ExceptionCodes');
