const mysql = require('../mysql').pool;

// Retorna todos departamentos
exports.getAllDepart = async (req, res)=>{

    console.log('\nRealizando conexão com banco de dados...');

    mysql.getConnection((error, conn) => {

        if(error){
            throw({
                error: true,
                endpoint: 'Obter todos departamentos',
                operation: 'Erro ao conectar com o banco de dados.',
                errorDescription: error
            });
        }
        
        console.log('Conectado! Realizando consulta no banco de dados...');

        conn.query(
            'SELECT * FROM tbl_departamentos WHERE idDepart <> 1 order BY idDepart ASC',
            (error, result, field) => {
                conn.release();

                if(error){
                    throw({
                        error: true,
                        endpoint: 'Obter todos departamentos',
                        operation: 'Erro ao realizar consulta no banco de dados.',
                        errorDescription: error
                    });
                }

                if (result.length == 0) {                    
                    console.log('\nSem departamentos cadastrados.');
                    return res.status(404).render('AcessoDepartamentos', {msg: "Sem departamentos cadastrados"})                  
                }      

                console.log('Sucesso!')
                res.status(200).render('AcessoDepartamentos', {result: result});         
            }
        );        
    });
};

// Cria novos departamentos
exports.createDepart = async (req, res)=>{
    const depart = req.body.nomeDepart;

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO tbl_departamentos (nomeDepart) VALUES (?)',
            [ depart ], 
            (error, result, field) => {
                conn.release();

                if (error) {
                    console.log('\n===== ERROR =====');
                    console.log(error);

                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
                }

                //Sucesso            
                res.render('SucessoDepart', {
                    msg: 'Deparatamento criado com sucesso !',
                    nomeDepart: depart,
                    idDepart: result.INSERTId
                });                
            }
        );
    });
};

// Alterar / atualizar departamentos
exports.attDepart = async (req, res)=>{

    const nome = req.body.nomeDepart;
    const id = req.body.idDepart;    

    mysql.getConnection((error, conn) => {
        conn.query(
            'update tbl_departamentos set nomeDepart = ? WHERE idDepart = ?',
            [nome, id], //parametros
            (error, result, field) => {
                conn.release();

                if (error) {
                    console.log('\n===== ERROR =====');
                    console.log(error);

                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
                }    

                res.status(200).render('SucessoDepart', {
                    msg: 'Departamento atualizado com sucesso !',
                    idDepart: id, 
                    nomeDepart: nome
                });
            }
        );
    });
};

//deletar funcionario
exports.deleteDepart = async (req, res)=>{
    const idDepart = req.body.idDepart;

    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM tbl_departamentos WHERE idDepart = ?',

            [idDepart], 

            (error, result, field) => {
                conn.release();

                if (error) {
                    console.log('\n===== ERROR =====');
                    console.log(error);

                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
                }

                res.status(202).render('SucessoDepart', {
                    msg: 'DEPARTAMENTO DELETADO COM SUCESSO.',
                    idDepart: idDepart,
                    nomeDepart: "DELETADO"
                });
            });
    });
};