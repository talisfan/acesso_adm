const mysql = require('../bin/mysql');

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

        conn.query('SELECT * FROM tbl_departamentos WHERE id <> 1 order BY id ASC',
        
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
                    return res.status(404).render('AcessoDepartamentos', {msg: "Sem departamentos cadastrados"})                  
                }      

                console.log('Sucesso! Resultado:');
                console.log(result);
                
                return res.status(200).render('AcessoDepartamentos', {result: result});         
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

        conn.query('INSERT INTO tbl_departamentos (nomeDepart) VALUES (?)',

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
                        
                console.log('Sucesso! Resultado:');
                console.log(result);

                return res.render('SucessoDepart', {
                    msg: 'Deparatamento criado com sucesso!',
                    nomeDepart: depart,
                    idDepart: result.insertId
                });                
            }
        );
    });
};

// Alterar / atualizar departamentos
exports.attDepart = async (req, res, next)=>{

    const endpoint = 'Atualizar departamento';

    console.log('\nRealizando conexão com banco de dados...');

    const nome = req.body.nomeDepart;
    const id = req.body.idDepart;    

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

        conn.query('update tbl_departamentos set nomeDepart = ? WHERE id = ?',

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

                return res.status(200).render('SucessoDepart', {
                    msg: 'Departamento atualizado com sucesso!',
                    idDepart: id, 
                    nomeDepart: nome
                });
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

        conn.query('DELETE FROM tbl_departamentos WHERE id = ?',

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

                return res.status(202).render('SucessoDepart', {
                    msg: 'Departamento deletado com sucesso.',
                    idDepart: idDepart,
                    nomeDepart: "DELETADO"
                });
            });
    });
};