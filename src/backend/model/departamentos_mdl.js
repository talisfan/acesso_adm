const mysql = require('../bin/mysql');
const static = require('../static');

// Retorna todos departamentos
exports.getAllDepart = async (req, res, next)=>{    

    const endpoint = 'Obter todos departamentos';

    console.log('\nRealizando conexão com banco de dados...');

    mysql.getConnection((error, conn) => {

        if(error){
            return next({
                status: 502,
                endpoint: endpoint,
                operation: 'Erro ao conectar com o banco de dados.',
                errorMessage: error
            });
        }
        
        console.log('Conectado! Realizando consulta no banco de dados...');

        const query = `SELECT * FROM ${static.strings.TABLE_DEPARTAMENTOS} WHERE idDepart <> 1 ORDER BY idDepart ASC`;

        conn.query(query,
        
            (error, result, field) => {
                conn.release();

                if(error){
                    return next({                        
                        endpoint: endpoint,
                        operation: 'Erro ao realizar consulta no banco de dados.',
                        errorMessage: error
                    });
                }

                if (result.length == 0) {                    
                    console.log('\nSem departamentos cadastrados.');
                    return res.status(404).send({error: true, msg: "Sem departamentos cadastrados"});
                }      

                console.log('Sucesso! Resultado:');
                console.log(result);
                
                return res.status(200).send(result);         
            }
        );        
    });
};

// Cria novos departamentos
exports.createDepart = async (req, res, next)=>{

    const endpoint = 'Criar departamento';

    console.log('\nRealizando conexão com banco de dados...');

    const depart = req.body.nomeDepart;

    mysql.getConnection((error, conn) => {
        if(error){
            return next({     
                status: 502,           
                endpoint: endpoint,
                operation: 'Erro ao conectar com o banco de dados.',
                errorMessage: error
            });
        }
        
        console.log('Conectado! Realizando inserção no banco de dados...');

        const query = `INSERT INTO ${static.strings.TABLE_DEPARTAMENTOS} (nomeDepart) VALUES (?)`;

        conn.query(query, 
            [ depart ], 

            (error, result, field) => {
                conn.release();

                if(error){
                    return next({                        
                        endpoint: endpoint,
                        operation: 'Erro ao inserir departamento no banco de dados.',
                        errorMessage: error
                    });
                }

                if(!result.insertId || result.insertId <= 0){
                    return next({                        
                        endpoint: endpoint,
                        operation: 'Erro ao inserir departamento no banco de dados.',
                        errorMessage: result.message
                    });
                }
                        
                console.log('Sucesso! Resultado:');
                console.log(result);

                return res.status(201).send({ idDepart: result.insertId });                
            }
        );
    });
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