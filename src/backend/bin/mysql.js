require('dotenv').config({ path: ".env" });
const mysql = require('mysql2');

const pool = mysql.createPool({
    "user": process.env.ACCESS_DB_USER,
    "password" : process.env.ACCESS_DB_PASS,
    "database": process.env.ACCESS_DB_NAME,
    "port": process.env.ACCESS_DB_PORT,
    "host": process.env.ACCESS_DB_HOST
});

module.exports = pool;