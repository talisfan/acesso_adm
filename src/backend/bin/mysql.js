const mysql = require('mysql');

require('dotenv').config({  
    path: process.env.ENV === "dev" ? ".env.dev" : ".env"
});

console.log(process.env.ENV != "dev" ? "\nAMBIENTE: prod" : "\nAMBIENTE: "+process.env.ENV);

const pool = mysql.createPool({
    "user": process.env.DB_USER,
    "password" : process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT,
    "host": process.env.DB_HOST
});

module.exports = pool;