const services = require('../services');
const static = require('../static');

// Retorna todos departamentos
exports.getDepart = async (idDepart = null)=>{        
    let queryValue = {
        query: `SELECT * FROM ${static.strings.TABLE_DEPARTAMENTOS} WHERE idDepart <> 1 `,
        values: null
    }

    if(idDepart){
        console.log(`[DEPARTAMENTOS][GET]: Procurando departamento de ID ${idDepart}...`);            
        queryValue.query += `AND idDepart = ? `;
        queryValue.values = [ idDepart ]
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

    console.log('\nRealizando conexão com banco de dados...');
    
    const queryValue = {
        query: `update ${static.strings.TABLE_DEPARTAMENTOS} set nomeDepart = ? WHERE idDepart = ?`,
        values: [nomeDepart, idDepart]
    };

    const result = await services.databaseConn(queryValue);
    return result;        
};

exports.deleteDepart = async (req, res, next)=>{
    
    const endpoint = 'Deletar departamento';

    console.log('\nRealizando conexão com banco de dados...');

    const idDepart = req.params.idDepart;

    mysql.getConnection((error, conn) => {

        if(error){
            return next({
                status: 502,
                endpoint: endpoint,
                operation: 'Erro ao conectar com o banco de dados.',
                errorMessage: error
            });
        }
        
        console.log('Conectado! Realizando exclusão de departamento...');

        const query = `DELETE FROM ${static.strings.TABLE_DEPARTAMENTOS} WHERE idDepart = ?`;

        conn.query(query,
            [idDepart], 

            (error, result, field) => {
                conn.release();

                if(error){
                    return next({                        
                        endpoint: endpoint,
                        operation: 'Erro ao deletar departamento.',
                        errorMessage: error
                    });
                }

                console.log('Sucesso! Resultado:');
                console.log(result);

                return res.status(204).send();
            });
    });
};