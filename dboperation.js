const config = require("./dbconfig");
//const sql = require("mssql");
const sql = require("mysql2");

async function getData() {
    try
    {

        let connection =  sql.createConnection(config) ;
        console.log("Database server connected");
        console.log(connection);

    //    let pool =  sql.connect(config) ;
    //    console.log("Database server connected");
    //    console.log(pool);
    
    }
    catch(error)
    {
        console.log("Error :" +error);
    }
}

async function getFacts(tableName) {

    const facts = { 
        tableName : tableName , 
        rowsNumber : 0, 
        indexesNumber : 0, 
        hasPrimaryKey : false ,
        //primaryKeyColumnsCount : 0 ,
        rule: null
    };

    const rules = {
        highNumberOfRows : null,
        noPrimaryKey: null,
        multiPrimaryKey: null
    };

    const pool = new sql.createPool(config);
    try {
        const promisePool = pool.promise();

        // Number-of-rows 
        let rowsResult  = await promisePool.query('SELECT COUNT(*) AS `rowscount` FROM ??',[tableName]);

        if (rowsResult !== null) {
            const res = rowsResult[0][0];
            if (res.rowscount > 0) {
                facts.rowsNumber = res.rowscount;
            }
            if (res.rowscount > 10000000) {
                rules.highNumberOfRows = 'Warning! Large table. The number of rows is ${res.rowscount} rows.';
            }
            else{
                rules.highNumberOfRows = 'High Number Of Rows Rule is pass the check.';
            }
        }

        // Number-of-indexes
        
        let indexResult  = await promisePool.query('SHOW INDEXES FROM ??',[tableName]);

        if (indexResult !== null) {
            if (indexResult[0].length > 0) {
                facts.indexesNumber = indexResult[0].length;
            }
        }

        // Has-primary-key

        let primaryKeyResult  = await promisePool.query('SHOW KEYS FROM ?? WHERE `Key_name` = ?',[tableName,'PRIMARY']);

        if ( primaryKeyResult !== null) {
            if ( primaryKeyResult[0].length > 0) {
                facts.hasPrimaryKey = true;
                facts.primaryKeyColumnsCount = primaryKeyResult[0].length;
                rules.noPrimaryKey = 'Primary Key Rule is pass the check.';
                rules.multiPrimaryKey = 'Primary Key Rule is pass the check.';
            }
            else{
                rules.noPrimaryKey = 'Warning: the table doesn`t have a PK.';
            }         
            if( primaryKeyResult[0].length > 4){
                rules.multiPrimaryKey = `High number of columns in the PK. Number of columns: ${primaryKeyResult[0].length}.`;
            }
        }
        facts.rule = rules;
        //console.log(facts);

        // let rowsresult  = await promisePool.query('SELECT COUNT(*) AS `rowscount` FROM ??',[tableName]);

        // if (rowsresult !== null) {
        //     const res = rowsresult[0][0];
        //     console.log( res.rowscount);
        //     if (res.rowscount > 0) {
        //         fact.rowsNumber = res.rowscount;
        //         //return res.rowscount ;
        //         console.error(rowsresult[0]);
        //     }
        // }
       return facts;
    } 
    catch (error) {
        console.error(error);
        if(error.code == 'ER_NO_SUCH_TABLE')
        {
            return error.sqlMessage;
        }
        throw new Error(error);
    } 
    finally {
        pool.releaseConnection(config); // closing connection after request is finished
    }


    // const pool = new sql.ConnectionPool(config);
    // try {
    //     await pool.connect();
    //     const request = pool.request();
    //     //let res = pool.request().query("select count(*) as rowscount from ${tableName}");
    //     let result = await request
    //         .query("select count(*) as rowscount from Students");
    //     if (result !== null) {
    //         if (result.rowsAffected[0] > 0) {
    //             return result.recordset[0];
    //             console.error(result.recordset[0]);
    //         }
    //     }
    //    // return null;
    // } catch (error) {
    //     console.error(error);
    //     throw new Error(error);
    // } finally {
    //     pool.close(); // closing connection after request is finished
    // }
}

module.exports = {
    getdata: getData,
    getFacts: getFacts

};