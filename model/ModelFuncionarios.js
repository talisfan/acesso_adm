const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos funcionarios
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'select * from tbl_funcionarios',            
                (error, result, field) => {
                conn.release();                

                if(error){
                    return res.status(500).send({
                        error: "true",
                        msg: error                        
                    });
                }      
                
                res.status(200).send({
                    error: "false",
                    msg: 'Mostrando todos funcionários: ',                    
                    response: result
                });
            }
        );
    });    
});

// insere novos funcionarios
router.post('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'insert into tbl_funcionario (nome, cpf, telefone, email, acesso) values(?, ?, ?, ?, ?)',
            [req.body.nome, req.body.cpf, req.body.telefone, req.body.email, req.body.acesso], //parametros
                (error, result, field) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        error: "true",
                        msg: error    
                    });
                }      
                
                res.status(201).send({
                    msg: 'Funcionário inserido com sucesso !',                                        
                });
            }
        );
    });    
});

//alterar/atualizar funcionario
router.patch('/', (req, res, next) => {
    const email = req.body.email;
    const telefone = req.body.telefone;
    const id = req.body.id;
    //const acesso = req.body.acesso;
    //const senha = req.body.senha;
    //const ativo = req.body.ativo;

    mysql.getConnection((error, conn) => {
        conn.query(
            'update tbl_funcionarios set email = ?, telefone = ? where id = ?',
            [email, telefone, id], //parametros
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
                }

                res.status(201).send({
                    error: "false",
                    msg: 'Funcionario atualizado com sucesso !',
                    id: id,                    
                    email: email,
                    telefone: telefone
                });
            }
        );
    });
});

//retorna um funcionario por login
router.post('/:user/:senha', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'select * from tbl_funcionarios where (email = ? or cpf = ?) and senha = ?',
            [req.params.user, req.params.user, req.params.senha],            
                (error, result, field) => {
                conn.release();                

                if(error){
                    return res.status(500).send({
                        error: "true",
                        msg: error                        
                    });
                }      
                
                res.render('ViewEscolha');
            }
        );
    });    
});

//deletar funcionario
router.delete('/', (req, res, next) => {
    res.status(202).send({
        mensagem: 'teste usando delete'
    });
});

module.exports = router;