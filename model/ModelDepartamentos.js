const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos departamentos
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'select * from tbl_departamentos',
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        msg: "Departamento não encontrado."
                    });                    
                }      

                res.render('AcessoDepartamentos', {result: result})          
            }
        );        
    });
});

// cria novos departamentos
router.post('/', (req, res, next) => {
    const depart = req.body.nomeDepart;

    mysql.getConnection((error, conn) => {
        conn.query(
            'insert into tbl_departamentos (nome) values (?)',
            [depart], //parametros
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
                }

                //Sucesso            
                res.render('SucessoDepart', {nome: depart, id: result.insertId})
                
            }
        );
    });
});

//alterar/atualizar departamentos
router.patch('/', (req, res, next) => {
    const nome = req.body.nomeDepart;
    const id = req.body.idDepart;
    mysql.getConnection((error, conn) => {
        conn.query(
            'update tbl_departamentos set nome = ? where id = ?',
            [nome, id], //parametros
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
                    msg: 'Departamento atualizado com sucesso !',
                    departamento: nome,
                    idDepartamento: id
                });
            }
        );
    });
});

//deletar departamentos
router.delete('/', (req, res, next) => {
    res.status(202).send({
        msg: 'teste usando delete'
    });
});

module.exports = router;