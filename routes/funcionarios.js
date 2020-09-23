const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos funcionarios
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'select * from tbl_funcionario',            
                (error, resultado, field) => {
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
                    response: resultado
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
                (error, resultado, field) => {
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
    res.status(201).send({
        msg: 'teste usando patch'
    });
});

//deletar funcionario
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'teste usando delete'
    });
});

module.exports = router;