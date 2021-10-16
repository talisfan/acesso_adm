const services = require('../services');
const static = require('../static');

// Retorna todos departamentos
exports.getDepart = async (busca = null)=>{        
    
    let queryValue = {
        query: `SELECT * FROM ${static.strings.TABLE_DEPARTAMENTOS} WHERE idDepart <> 1 `,
        values: null
    }

    if(busca.value){
        console.log(`[DEPARTAMENTOS][GET]: Procurando departamento de ID ${busca.value}...`);            
        queryValue.query += `AND ${busca.campo} = ? `;
        queryValue.values = [ busca.value ]
    }else{
        console.log(`[DEPARTAMENTOS][GET]: Listando departamentos...`);
    }
    
    queryValue.query += 'ORDER BY idDepart ASC;';
    const result = await services.databaseConn(queryValue);
    
    return result;
};

// Cria novos departamentos
exports.createDepart = async (nomeDepart)=>{    
    
    const queryValue = {
        query: `INSERT INTO ${static.strings.TABLE_DEPARTAMENTOS} (nomeDepart) VALUES (?)`,
        values: [ nomeDepart ]
    }

    const result = await services.databaseConn(queryValue);
    return result;
};

// Alterar / atualizar departamentos
exports.attDepart = async (idDepart, nomeDepart)=>{        
    
    const queryValue = {
        query: `UPDATE ${static.strings.TABLE_DEPARTAMENTOS} SET nomeDepart = ? WHERE idDepart = ?`,
        values: [nomeDepart, idDepart]
    };

    const result = await services.databaseConn(queryValue);
    return result;        
};

exports.deleteDepart = async (idDepart)=>{
    
    const queryValue = {
        query: `DELETE FROM ${static.strings.TABLE_DEPARTAMENTOS} WHERE idDepart = ?`,
        values: [ idDepart ]
    };

    const result = await services.databaseConn(queryValue);
    return result;        
};