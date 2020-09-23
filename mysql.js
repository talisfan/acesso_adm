const mysql = require('mysql');

var pool = mysql.createPool({
    "user": "root",
    "password" : "",
    "database": "DesafioTech_Database",
    "host": "127.0.0.1"
});

exports.pool = pool;