    const config = {
        host: 'localhost',
        user: 'root',
        password:'mysqlPass@07',
        database: 'studydb',

        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
        // user:"admin",
        // password:"mysqlPass@07",
        // server:"http://localhost:3306/",
        // database:"chatDB",
        // options: {
        //     trustedconnection: true,
        //     enableArithAbort: true,
        //     instancename:"",
        // },

    }

    module.exports = config;
    