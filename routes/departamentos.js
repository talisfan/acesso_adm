const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos departamentos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'select * from tbl_departamento',            
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
                    msg: 'Mostrando todos departamentos: ',                    
                    response: resultado
                });
            }
        );
    });    
});

// cria novos departamentos
router.post('/', (req, res, next) => {
    const depart = req.body.nomeDepartamento;
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'insert into tbl_departamento (nome) values (?)',
            [depart], //parametros
                (error, resultado, field) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        error: "true",
                        msg: error    
                    });
                }      
                
                res.status(201).send({
                    error: "false",
                    msg: 'Departamento inserido com sucesso !',
                    departamento: depart,
                    idDepartamento: resultado.insertId
                });
            }
        );
    });    
});

//alterar/atualizar departamentos
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'teste usando patch'
    });
});

//deletar departamentos
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'teste usando delete'
    });
});

module.exports = router;