const services = require('../services');
const static = require('../static');
const utils_functions = require('../static/utils_functions')

// Retorna todos departamentos
exports.getDepart = async (req, res, next)=>{    
    try{
        let queryValue = {
            query: `SELECT * FROM ${static.strings.TABLE_DEPARTAMENTOS} WHERE idDepart <> 1 `,
            values: null
        }

        if(req.query && req.query.nome){
            console.log(`[DEPARTAMENTOS][GET]: Procurando departamentos ${req.query.nome}...`);
            const nomeDepart = `%${req.query.nome}%`;
            queryValue.query += `AND nomeDepart LIKE ? `;
            queryValue.values = [ nomeDepart ]
        }else{
            console.log(`[DEPARTAMENTOS][GET]: Listando departamentos...`);
        }
        
        queryValue.query += 'ORDER BY idDepart ASC;';
        const result = await services.databaseConn(queryValue);
        
        if (result.length == 0) {                    
            console.log('\nSem departamentos cadastrados.');
            const response = {error: true, msg: "Sem departamentos cadastrados"};
            utils_functions.printResponse(response)
            return res.status(404).send(response);
        }  

        utils_functions.printResponse(result, 200);
        return res.status(200).send(result);     
    }catch(error){
        return next(error);
    }
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
exports.attDepart = async (req, res, next)=>{

    const endpoint = 'Atualizar departamento';

    console.log('\nRealizando conexão com banco de dados...');

    const nome = req.query.nomeDepart;
    const id = req.query.idDepart;    

    mysql.getConnection((error, conn) => {

        if(error){
            return next({    
                status: 502,            
                endpoint: endpoint,
                operation: 'Erro ao conectar com o banco de dados.',
                errorMessage: error
            });
        }
        
        console.log('Conectado! Realizando atualização de departamento...');

        const query = `update ${static.strings.TABLE_DEPARTAMENTOS} set nomeDepart = ? WHERE idDepart = ?`;

        conn.query(query,
            [nome, id], 

            (error, result, field) => {
                conn.release();

                if(error){
                    return next({                        
                        endpoint: endpoint,
                        operation: 'Erro ao atualizar departamento.',
                        errorMessage: error
                    });
                }  

                console.log('Sucesso! Resultado:');
                console.log(result);

                const msg = result['changedRows'] > 0 ? 'Sucesso na alteração' : 'Falha na alteração';

                return res.status(204).send({ msg });
            }
        );
    });
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