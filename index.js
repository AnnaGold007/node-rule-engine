const express = require('express');
const sql = require("./dboperation");

const app = express();
app.use(express.json());

// test connection
app.get('/testConnection', function (req, res,next){
    console.log(sql.getdata());
    // sql.getdata();
});

app.get('/rules/:tableName', (req, res) =>{
    const tableName =  req.params.tableName  ;
    const result =tableName;
    if(!result) res.status(404).send(`Table ${tableName} doesn’t exist in the storage`)

    res.send(result);
});

app.get('/facts', function (req, res) {
    const tableName =  req.query.tableName;
    console.log(tableName);
    sql.getFacts(tableName).then((result) => {
        console.log(result);
        res.json(result);
  //      res.json(result[0]);
    });
});


//PORT

const port = process.env.PORT || 8080;

app.listen({ port }, () =>{
    try
    {

    }
    catch(error){
        console.log('Could not connect to DB', error);
    }
    console.log(`Listening to port ${port}...`);
})