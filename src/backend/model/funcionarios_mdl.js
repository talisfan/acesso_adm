const express = require('express');
const router = express.Router();
const mysql = require('../bin/mysql').pool;

//retorna todos funcionarios
exports.getFunc = async (req, res, next) => {
    
    console.log('\nRealizando conexão com banco de dados...');

    let query;

    if(req.query && req.query.nomeFunc){
        const nomeFunc = `%${req.body.nomeFunc}%`;
        query = `select * from tbl_funcionarios f inner join tbl_departamentos d on (f.idDepart = d.id) where f.nome like ${nomeFunc} order by f.id asc`;
    }else{
        query = 'select * from tbl_funcionarios f inner join tbl_departamentos d on (f.idDepart = d.id) order by f.id asc';
    }
    
    mysql.getConnection((error, conn) => {

        if(error){
            return next(new Error({
                status: 502,
                endpoint: 'Obter funcionários',
                operation: 'Erro ao conectar com o banco de dados.',
                errorMessage: error
            }));
        }

        conn.query(query,
            (error, result, field) => {
                conn.release();

                if(error){
                    return next(new Error({                        
                        endpoint: 'Obter funcionários',
                        operation: 'Erro ao realizar consulta no banco de dados.',
                        errorMessage: error
                    }));
                }

                console.log('Sucesso! Resultado:');
                console.log(result);

                res.status(200).render('AcessoFuncionarios', {                    
                    //msg: 'Mostrando todos funcionários: ',
                    result: result
                });
            }
        );
    });
};

// insere novos funcionarios
exports.attFunc = async (req, res, next) => {    

    console.log('\nRealizando conexão com banco de dados...');

    mysql.getConnection((error, conn) => {
        
        if(error){
            return next(new Error({
                status: 502,
                endpoint: 'Atualizar funcionário',
                operation: 'Erro ao conectar com o banco de dados.',
                errorMessage: error
            }));
        }

        conn.query(
            'insert into tbl_funcionarios (nome, cpf, telefone, email, acesso, senha, idDepartamento) values(?, ?, ?, ?, ?, ?, ?)',
            [req.body.nome, req.body.cpf, req.body.telefone, req.body.email, req.body.acesso, req.body.senha, req.body.idDepart], //parametros
            (error, result, field) => {
                conn.release();

                if(error){
                    return next(new Error({                        
                        endpoint: 'Atualizar funcionários',
                        operation: 'Erro ao realizar alteração no banco de dados.',
                        errorMessage: error
                    }));
                }


                res.status(201).render('SucessoFunc', {
                    msg: 'Funcionario inserido com sucesso !',
                    id: result.insertId,
                    nome: req.body.nome,
                    telefone: req.body.telefone,
                    email: req.body.email,
                    senha: req.body.senha,
                    idDepart: req.body.idDepart
                });
            }
        );
    });
};

//alterar/atualizar funcionario
router.post('/attFunc', (req, res, next) => {


    console.log('\nRealizando conexão com banco de dados...');

    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;    
    const idDepart = req.body.idDepart;
    
    console.log(req.body);

    mysql.getConnection((error, conn) => {
        conn.query(
            'update tbl_funcionarios set email = ?, telefone = ?, idDepartamento = ? where id = ?',
            [email, telefone, idDepart, id], //parametros
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
                }

                res.status(200).render('SucessoFunc', {
                    msg: 'Funcionario atualizado com sucesso !',
                    id: id,
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    idDepart: idDepart                    
                });
            }
        );
    });
});

//deletar funcionario
router.post('/dellFunc', (req, res, next) => {

    console.log('\nRealizando conexão com banco de dados...');

    const id = req.body.id;

    mysql.getConnection((error, conn) => {
        conn.query(
            'delete from tbl_funcionarios where id = ?',
            [id], //parametros
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
                }
                res.status(202).render('SucessoFunc', {
                    msg: 'FUNCIONÁRIO DELETADO COM SUCESSO.',
                    id: id,
                    nome: "DELETADO"
                });
            });
    });
});

module.exports = router;