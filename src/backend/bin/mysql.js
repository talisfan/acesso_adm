const mysql = require('mysql');

var pool = mysql.createPool({
    "user": "root",
    "password" : "root",
    "database": "db_controle",
    "host": "127.0.0.1"
});

exports.pool = pool;