require('dotenv').config({ path: ".env" });
const mysql = require('mysql2');

const pool = mysql.createPool({
    "user": 'root',
    "password" : process.env.ACCESS_DB_PASS,
    "database": process.env.ACCESS_DB_NAME,
    "port": process.env.ACCESS_DB_PORT,
    "host": process.env.ACCESS_DB_HOST,
    "dateStrings": true
});

module.exports = pool;