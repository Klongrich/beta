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

http.createServer(app).listen(3015, () => {
    console.log("started on port 3015: ");
})

