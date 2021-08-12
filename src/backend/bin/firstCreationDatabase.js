const static = require('../static');
const services = require('../services')

module.exports = async()=>{
    await static.utils_functions.sleep(4000);    
    let tentativas = 0;
    
    while(tentativas < 3){       
        try{
            let queryValue = {
                query: `SELECT idDepart FROM ${static.strings.TABLE_DEPARTAMENTOS};`,
                values: null
            }
            await services.databaseConn(queryValue);            
            return;
        }catch(error){            
            if(error.errorMessage.code === 'ER_NO_SUCH_TABLE'){ 
                break;
            }else if(tentativas < 2){
                tentativas++;
                await static.utils_functions.sleep(1000);
                continue;
            }else{
                console.error('===== ERROR =====');
                console.error('ERRO AO CONECTAR COM BANCO DE DADOS\n', 'Excesso de tentativas\n', error);
                return;
            }
        }
    }

    tentativas = 0;
    
    while(tentativas < 3){      
        console.log('\nCriando banco de dados...\n');
        const listQuerys = require('./utils/script_db.min');

        let arrayTables = listQuerys.tables.split(';');

        for(let query of arrayTables){
            query += ';';   
            let queryValue_tables = { query, values: null }                     
            await services.databaseConn(queryValue_tables);                    
        };

        let queryValue_trigger = listQuerys.trigger;        

        let arrayInserts = listQuerys.inserts.split(';');

        for(let query of arrayInserts){
            query += ';';                
            let queryValue_inserts = { query, values: null }                             
            await services.databaseConn(queryValue_inserts);   
        };   
        break;           
    }
    
    return;
}
