const express = require('express');
const router = express.Router();
const mysql = require('../bin/mysql').pool;

//retorna todos funcionarios
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'select * from tbl_funcionarios f inner join tbl_departamentos d on (f.idDepartamento = d.idDepart) order by f.id asc',
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
                }

                console.log(result)

                res.status(200).render('AcessoFuncionarios', {
                    error: "false",
                    msg: 'Mostrando todos funcionários: ',
                    result: result
                });
            }
        );
    });
});

// busca de funcionario por nome
router.post('/buscaFunc', (req, res, next) => {
    const nome = "%" + req.body.nome + "%";

    mysql.getConnection((error, conn) => {
        conn.query(
            'select * from tbl_funcionarios f inner join tbl_departamentos d on (f.idDepartamento = d.idDepart) where f.nome like ? order by f.id asc',
            [nome],
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
                }

                console.log(result)

                res.status(200).render('AcessoFuncionarios', {
                    error: "false",
                    msg: 'Mostrando todos funcionários: ',
                    result: result
                });
            }
        );
    });
});

// insere novos funcionarios
router.post('/', (req, res, next) => {
    //func = [{
    //    nome: req.body.nome,
    //    cpf: req.body.cpf, 
    //    telefone: req.body.telefone, 
    //    email: req.body.email, 
    //    acesso: req.body.acesso, 
    //    senha: req.body.senha, 
    //    idDepart: req.body.idDepart
    //}];
//
    //if(!func['nome'] || !func['cpf']){
    //    res.render('CadFunc', {
    //        erro: "Informe todos os dados do funcionário !"
    //    });           
    //}

    mysql.getConnection((error, conn) => {
        conn.query(
            'insert into tbl_funcionarios (nome, cpf, telefone, email, acesso, senha, idDepartamento) values(?, ?, ?, ?, ?, ?, ?)',
            [req.body.nome, req.body.cpf, req.body.telefone, req.body.email, req.body.acesso, req.body.senha, req.body.idDepart], //parametros
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
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
});

//alterar/atualizar funcionario
router.post('/attFunc', (req, res, next) => {
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


////retorna um funcionario por login
//router.post('/:user/:senha', (req, res, next) => {
//    mysql.getConnection((error, conn) => {
//        conn.query(
//            'select * from tbl_funcionarios where (email = ? or cpf = ?) and senha = ?',
//            [req.params.user, req.params.user, req.params.senha],
//            (error, result, field) => {
//                conn.release();
//
//                if (error) {
//                    return res.status(500).send({
//                        error: "true",
//                        msg: error
//                    });
//                }
//
//                res.render('ViewEscolha');
//            }
//        );
//    });
//});

module.exports = router;