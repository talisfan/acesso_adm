const services = require('../services');
const static = require('../static');

exports.getFunc = async (req, res, next) => {
    
    console.log('\nRealizando conexão com banco de dados...');

    let query = `
        select f.nome, f.telefone, f.email, f.id, d.idDepart, d.nomeDepart, f.acesso 
        from ${static.strings.TABLE_FUNCIONARIOS} f 
        inner join ${static.strings.TABLE_DEPARTAMENTOS} d 
        on (f.idDepart = d.idDepart) 
    `;

    if(req.query && req.query.nome){
        const nomeFunc = `%${req.query.nome}%`;
        query += `where f.nome like "${nomeFunc}" order by f.id asc`;
    }

    try{
        const result = await services.databaseConn({query, values: null});
        return res.status(200).send(result);
    }catch(error){
        return next(error);
    }
};

// insere novos funcionarios
exports.createFunc = async (req, res, next) => {    

    console.log('\nRealizando conexão com banco de dados...');
    const hashPass = static.utils_functions.hashMD5(req.body.senha);

    let queryValue = {
        query: `insert into ${static.strings.TABLE_FUNCIONARIOS} 
            (nome, telefone, email, acesso, senha, idDepart) values(?, ?, ?, ?, ?, ?)`, 
        values: [
            req.body.nome, req.body.telefone, req.body.email,
            req.body.acesso, hashPass, req.body.departamento
        ]
    }
    
    try{
        const result = await services.databaseConn(queryValue);
        return res.status(201).render('SucessoFunc', {
            msg: 'Funcionario inserido com sucesso !',
            id: result.insertId,
            nome: req.body.nome,
            telefone: req.body.telefone,
            email: req.body.email,                    
            idDepart: req.body.idDepart
        });
    }catch(error){
        return next(error);
    }
};

exports.attFunc = async (req, res, next) => {

    console.log('\nRealizando conexão com banco de dados...');

    const id = req.body.idFunc;    
    const email = req.body.email;
    const telefone = req.body.telefone;    
    const idDepart = req.body.idDepart;        

    let queryValue = {
        query: `update ${static.strings.TABLE_FUNCIONARIOS} set email = ?, telefone = ?, idDepart = ? where id = ?`,
        values: [ email, telefone, idDepart, id ]
    }
    
    try{
        const result = await services.databaseConn(queryValue);
        return res.status(200).render('SucessoFunc', {
            msg: 'Funcionario atualizado com sucesso !',
            id, email, telefone, idDepart                    
        });
    }catch(error){
        return next(error);
    }
};

exports.deleteFunc = async (req, res, next) => {

    console.log('\nRealizando conexão com banco de dados...');

    const id = req.body.idFunc;

    let queryValue = {
        query: `delete from ${static.strings.TABLE_FUNCIONARIOS} where id = ?`,
        values: [ id ]
    }

    try{
        const result = await services.databaseConn(queryValue);
        return res.status(202).render('SucessoFunc', {
            msg: 'FUNCIONÁRIO DELETADO COM SUCESSO.',
            id: id,
            nome: "DELETADO"
        });
    }catch(error){
        return next(error);
    }
};