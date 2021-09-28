const services = require('../services');
const static = require('../static');

exports.getFunc = async (buscaFunc = null) => {

    let queryValue = {
        query: `
            select f.nome, f.telefone, f.email, f.id, d.idDepart, d.nomeDepart, f.acesso 
            from ${static.strings.TABLE_FUNCIONARIOS} f 
            inner join ${static.strings.TABLE_DEPARTAMENTOS} d 
            on (f.idDepart = d.idDepart) `,
        values: null
    }

    if(buscaFunc.campo && buscaFunc.valor){
        console.log(`[FUNCIONARIOS][GET]: Procurando funcionário ${buscaFunc.valor}...`);

        if(buscaFunc.campo === 'nome') buscaFunc.valor = `%${buscaFunc.valor}%`;
        
        queryValue.query += `where f.${buscaFunc.campo} like ? order by f.id asc`;
        queryValue.values = [ buscaFunc.valor ];
    }else{
        console.log(`[FUNCIONARIOS][GET]: Listando funcionários...`);
    }
    
    const response = await services.databaseConn(queryValue);
    return response;    
};

// insere novos funcionarios
exports.createFunc = async (funcionario) => {    
    
    const { nome, telefone, email, acesso, senha, departamento } = funcionario;

    const hashPass = static.utils_functions.hashMD5(senha);

    let queryValue = {
        query: `insert into ${static.strings.TABLE_FUNCIONARIOS} 
            (nome, telefone, email, acesso, senha, idDepart) values(?, ?, ?, ?, ?, ?)`, 
        values: [
            nome, telefone, email,
            acesso, hashPass, departamento
        ]
    }    
    
    const result = await services.databaseConn(queryValue);
    const response = {
        msg: 'Funcionario inserido com sucesso !',
        id: result.insertId,
        nome,
        telefone,
        email,
        idDepart
    };
    return response;    
};

exports.attFunc = async (funcionario) => {
    
    const { email, telefone, idDepart, id } = funcionario;
    let queryValue = {
        query: `update ${static.strings.TABLE_FUNCIONARIOS} set email = ?, telefone = ?, idDepart = ? where id = ?`,
        values: [ email, telefone, idDepart, id ]
    }
        
    const result = await services.databaseConn(queryValue);
    const response = {
        msg: 'Funcionario atualizado com sucesso !',
        id, email, telefone, idDepart                    
    }
        
    return response;
};

exports.deleteFunc = async (id) => {

    let queryValue = {
        query: `delete from ${static.strings.TABLE_FUNCIONARIOS} where id = ?`,
        values: [ id ]
    };
    
    const result = await services.databaseConn(queryValue);
    const response = {
        msg: 'FUNCIONÁRIO DELETADO COM SUCESSO.',
        id: id,
        nome: "DELETADO"
    };
    return response        
};