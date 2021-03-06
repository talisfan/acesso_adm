
const mysql = require('../mysql').pool;

//retorna todos departamentos
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'select * from tbl_departamentos where idDepart <> 1 order by idDepart asc',
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: "true",
                        msg: error
                    });
                }

                if (result.length == 0) {
                    return res.status(404).render('AcessoDepartamentos', {msg: "Sem departamentos cadastrados"})                  
                }      

                res.status(200).render('AcessoDepartamentos', {result: result});         
            }
        );        
    });
});

// cria novos departamentos
router.post('/', (req, res, next) => {
    const depart = req.body.nomeDepart;

    mysql.getConnection((error, conn) => {
        conn.query(
            'insert into tbl_departamentos (nomeDepart) values (?)',
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
                res.render('SucessoDepart', {
                    msg: 'Deparatamento criado com sucesso !',
                    nomeDepart: depart,
                    idDepart: result.insertId
                });                
            }
        );
    });
});

//alterar/atualizar departamentos
router.post('/attDepart', (req, res, next) => {

    const nome = req.body.nomeDepart;
    const id = req.body.idDepart;    

    mysql.getConnection((error, conn) => {
        conn.query(
            'update tbl_departamentos set nomeDepart = ? where idDepart = ?',
            [nome, id], //parametros
            (error, result, field) => {
                conn.release();

                if (error) {
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
});

//deletar funcionario
router.post('/dellDepart', (req, res, next) => {
    const idDepart = req.body.idDepart;

    mysql.getConnection((error, conn) => {
        conn.query(
            'delete from tbl_departamentos where idDepart = ?',
            [idDepart], //parametros
            (error, result, field) => {
                conn.release();
                if (error) {
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
});

module.exports = router;