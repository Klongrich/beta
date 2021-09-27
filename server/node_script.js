const mysql = require('mysql');
const http = require('http'); //Upgrade to https;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { QueryBuilder } = require('@mui/icons-material');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const con = mysql.createConnection({
    host: 'XXXXX',
    user: 'XXXXXX',
    password: "XXXX",
    database: "XXXXX"
});

con.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connection established');
});

//Add a request limitor. Flag by IP until AUTH 
app.get('/fur', function (req, res) {

    console.log(req.query.id);

    let furID = req.query.id;
    let query = 'SELECT * FROM wallameta WHERE fur = ' + furID + ' LIMIT 20';

    con.query(query, function (error, results, fields) {
        if (error) throw error;

        console.log(results[0]);
        console.log(results[1].tokenID);
        console.log(results);

        res.send(results);
    });

})

app.get("/role", function (req, res, next) {

    console.log(req.query.id);

    let roleID = req.query.id;
    let query = "SELECT * FROM meat WHERE role = " + roleID + ' LIMIT 20';

    //Adding Basic Checks
    if (roleID < 0) {
        res.send("ID is less than 0");
    } else if (roleID > 5) {
        res.send("ID is greater than 5");
    } else {
        con.query(query, function (err, results, feields) {
            if (err) throw err;

            console.log(results);
            res.send(results);
        })
    }
})

// Add AUTH and limitor.
app.get("/pudgy/head", function (req, res, next) {

    let ID = req.query.id;
    let Limit = req.query.limit;

    //Make sure ID is not null or over over range;
    if (ID == null) {
        console.log("null id request sent");
        res.send("ID requested is NULL!");
    } else if (ID < 0) {
        console.log("ID is requested is less than 0");
        res.send("Requested ID less than 0");
    } else if (ID > 50) {
        console.log("ID is over range ... ");
        res.send("Requested ID is over range")
    } else {

        //Allow up to 50 iteams. Default to 20;
        if (Limit == null) {
            Limit = 20;
        } else if (Limit > 50) {
            Limit = 20;
        }

        let query = "SELECT * FROM pudgy WHERE head = " + ID + ' LIMIT' + Limit;

        con.query(query, function (err, results) {
            if (err) throw err;

            console.log(results);
            res.send(results);
        })
    }
})

http.createServer(app).listen(3015, () => {
    console.log("started on port 3015: ");
})

