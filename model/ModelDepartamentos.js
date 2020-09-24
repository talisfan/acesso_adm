const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos departamentos
router.get('/', (req, res, next) => {
    const param = req.body.idDepartamento;
    //testando se get é somente para um departamento específico ou para todos
    if (!param) {

        mysql.getConnection((error, conn) => {
            conn.query(
                'select * from tbl_departamento',
                (error, result, field) => {
                    conn.release();

                    if (error) {
                        return res.status(500).send({
                            error: "true",
                            msg: error
                        });
                    }

                    if(result.length == 0){
                        return res.status(404).send({
                            msg: "Departamento não encontrado."
                        })

                    }

                    const response = {
                        quantidade: result.length,
                        departamentos: result.map(depart => {
                            return{
                                idDepartamento: depart.id,
                                nomeDepartamento: depart.nome
                            }
                        })
                    };

                    res.status(200).send({
                        error: "false",
                        msg: 'Mostrando todos departamentos: ',
                        response: response
                    });
                }
            );
        });

    } else{
        var idDepart = req.body.idDepartamento;

        mysql.getConnection((error, conn) => {
            conn.query(
                'select * from tbl_departamento where id = ?',
                [idDepart], //parametro (id)
                (error, result, field) => {
                    conn.release();

                    if (error) {
                        return res.status(500).send({
                            error: "true",
                            msg: error
                        });
                    }

                    res.status(200).send({
                        error: "false",
                        msg: 'Departamento: ',
                        response: result
                    });
                }
            );
        });
    }
});

// cria novos departamentos
router.post('/', (req, res, next) => {
    const depart = req.body.nomeDepartamento;

    mysql.getConnection((error, conn) => {
        conn.query(
            'insert into tbl_departamento (nome) values (?)',
            [depart], //parametros
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
                    msg: 'Departamento inserido com sucesso !',
                    departamento: depart,
                    idDepartamento: result.insertId
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
    res.status(202).send({
        mensagem: 'teste usando delete'
    });
});

module.exports = router;