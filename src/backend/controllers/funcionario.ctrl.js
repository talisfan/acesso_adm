const services = require('../services');
const { utils_functions } = require('../static');
const static = require('../static');

exports.getFunc = async (req, res, next) => {

    let query = `
        select f.nome, f.telefone, f.email, f.id, d.idDepart, d.nomeDepart, f.acesso 
        from ${static.strings.TABLE_FUNCIONARIOS} f 
        inner join ${static.strings.TABLE_DEPARTAMENTOS} d 
        on (f.idDepart = d.idDepart) 
    `;

    if(req.query && req.query.nome){
        console.log(`[FUNCIONARIOS][GET]: Procurando funcionário ${req.query.nome}...`);
        const nomeFunc = `%${req.query.nome}%`;
        query += `where f.nome like "${nomeFunc}" order by f.id asc`;
    }else{
        console.log(`[FUNCIONARIOS][GET]: Listando funcionários...`);
    }

    try{
        const response = await services.databaseConn({query, values: null});
        utils_functions.printResponse(response, 200);
        return res.status(200).send(response);
    }catch(error){
        return next(error);
    }
};

// insere novos funcionarios
exports.createFunc = async (req, res, next) => {    
    
    const hashPass = static.utils_functions.hashMD5(req.body.senha);

    let queryValue = {
        query: `insert into ${static.strings.TABLE_FUNCIONARIOS} 
            (nome, telefone, email, acesso, senha, idDepart) values(?, ?, ?, ?, ?, ?)`, 
        values: [
            req.body.nome, req.body.telefone, req.body.email,
            req.body.acesso, hashPass, req.body.departamento
        ]
    }

    console.log(`[FUNCIONARIOS][POST]: Criando funcionário ${req.body.nome}...`);
    
    try{
        const result = await services.databaseConn(queryValue);
        const response = {
            msg: 'Funcionario inserido com sucesso !',
            id: result.insertId,
            nome: req.body.nome,
            telefone: req.body.telefone,
            email: req.body.email,                    
            idDepart: req.body.idDepart
        };
        utils_functions.printResponse(response, 201);
        return res.status(201).render('SucessoFunc', response);
    }catch(error){
        return next(error);
    }
};

exports.attFunc = async (req, res, next) => {

    const id = req.body.idFunc;    
    const email = req.body.email;
    const telefone = req.body.telefone;    
    const idDepart = req.body.idDepart;        

    console.log(`[FUNCIONARIOS][PATCH]: Atualizando funcionário ${id}...`);
    
    let queryValue = {
        query: `update ${static.strings.TABLE_FUNCIONARIOS} set email = ?, telefone = ?, idDepart = ? where id = ?`,
        values: [ email, telefone, idDepart, id ]
    }
    
    try{
        const result = await services.databaseConn(queryValue);
        const response = {
            msg: 'Funcionario atualizado com sucesso !',
            id, email, telefone, idDepart                    
        }
        utils_functions.printResponse(response, 200);
        return res.status(200).render('SucessoFunc', response);
    }catch(error){
        return next(error);
    }
};

exports.deleteFunc = async (req, res, next) => {

    const id = req.body.idFunc;
    console.log(`[FUNCIONARIOS][DELETE]: Deletando funcionário ${id}...`);

    let queryValue = {
        query: `delete from ${static.strings.TABLE_FUNCIONARIOS} where id = ?`,
        values: [ id ]
    };

    try{
        const result = await services.databaseConn(queryValue);
        const response = {
            msg: 'FUNCIONÁRIO DELETADO COM SUCESSO.',
            id: id,
            nome: "DELETADO"
        };
        utils_functions.printResponse(response, 202);
        return res.status(202).render('SucessoFunc', response);
    }catch(error){
        return next(error);
    }
};