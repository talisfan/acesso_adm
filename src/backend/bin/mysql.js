const mysql = require('mysql');

require('dotenv').config({  
    path: process.env.ENV === "dev" ? ".env.dev" : ".env"
});

console.log(process.env.ENV != "dev" ? "\nAMBIENTE: prod" : "\nAMBIENTE: "+process.env.ENV);

const pool = mysql.createPool({
    "user": process.env.ACCESS_DB_USER,
    "password" : process.env.ACCESS_DB_PASS,
    "database": process.env.ACCESS_DB_NAME,
    "port": process.env.ACCESS_DB_PORT,
    "host": process.env.ACCESS_DB_HOST
});

module.exports = pool;