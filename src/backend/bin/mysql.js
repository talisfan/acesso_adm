require('dotenv').config({ path: ".env" });
const mysql = require('mysql2');
const static = require('../static');

const pool = mysql.createPool({
    "user": process.env.ACCESS_DB_USER,
    "password" : process.env.ACCESS_DB_PASS,
    "database": process.env.ACCESS_DB_NAME,
    "port": process.env.ACCESS_DB_PORT,
    "host": process.env.ACCESS_DB_HOST
});

let tentativas = 0;

function firstAccessVerification(){

    pool.getConnection(async (error, conn)=>{
        if(error){
            if(tentativas < 5){
                tentativas++;
                await static.utils_functions.sleep(1500);
                firstAccessVerification();
            }else{
                console.log('===== ERROR =====');
                console.log('ERRO AO CONECTAR COM BANCO DE DADOS\n', 'Excesso de tentativas\n', error);
            }
            return;
        }

        const query = `SELECT idDepart FROM ${static.strings.TABLE_DEPARTAMENTOS};`;
    
        conn.query(query, (err, result, field)=>{
            if(err){
                if(err.code == 'ER_NO_SUCH_TABLE'){                    
                    console.log('\nCriando banco de dados...\n');
                    const querys = require('./utils/script_db.min');

                    let arrayTables = querys.tables.split(';');

                    arrayTables.forEach(query =>{
                        query += ';';
                        tentativas = 0;
                        createTables(query);                    
                    });

                    let trigger = querys.trigger;
                    tentativas = 0;
                    createTables(trigger);                    

                    let arrayInserts = querys.inserts.split(';');

                    arrayInserts.forEach(query =>{
                        query += ';';
                        tentativas = 0;
                        createTables(query);                    
                    });
                    
                }else{
                    console.log('===== ERROR =====');
                    console.log('ERROR_QUERY=> ', err);
                }
                return;
            }
    
            console.log('--RESULT--', result);
            return;
        });
    });
}

(async ()=> {
    await static.utils_functions.sleep(4000);
    firstAccessVerification();
})()

function createTables(query){
    pool.getConnection(async (error, conn)=>{
        if(error){
            if(tentativas < 3){
                tentativas++;
                await static.utils_functions.sleep(1000);
                createTables();
            }else{
                console.log('===== ERROR =====');
                console.log('ERRO AO CONECTAR COM BANCO DE DADOS\n', 'Excesso de tentativas\n', error);
                return;
            }
        }

        conn.query(query, (err, result, field)=>{
            if(err){
                console.log('===== ERROR =====');
                console.log('---ERROR_QUERY--- ', query, '\n[ERROR]=>', err);
                return;
            }

            console.log('!!!SUCCESS!!!', result);
        });
    });
}

module.exports = pool;