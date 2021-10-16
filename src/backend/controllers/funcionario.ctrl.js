const services = require('../services');
const static = require('../static');

exports.getFunc = async (buscaFunc = null) => {

    let queryValue = {
        query: `
            SELECT f.nome, f.telefone, f.email, f.id, d.idDepart, d.nomeDepart, f.acesso 
            FROM ${static.strings.TABLE_FUNCIONARIOS} f 
            INNER JOIN ${static.strings.TABLE_DEPARTAMENTOS} d 
            ON (f.idDepart = d.idDepart) `,
        values: null
    }

    if(buscaFunc.campo && buscaFunc.valor){
        console.log(`[FUNCIONARIOS][GET]: Procurando funcionário ${buscaFunc.valor}...`);

        if(buscaFunc.campo === 'nome') buscaFunc.valor = `%${buscaFunc.valor}%`;
        
        queryValue.query += `WHERE f.${buscaFunc.campo} LIKE ? ORDER BY f.id asc`;
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
        query: `INSERT INTO ${static.strings.TABLE_FUNCIONARIOS} 
            (nome, telefone, email, acesso, senha, idDepart) VALUES (?, ?, ?, ?, ?, ?)`, 
        values: [
            nome, telefone, email,
            acesso, hashPass, departamento
        ]
    }    
    
    const result = await services.databaseConn(queryValue);
    const response = {
        msg: 'Funcionario inserido com sucesso!',
        id: result.insertId,
        nome,
        telefone,
        email,
        departamento
    };
    return response;    
};

exports.attFunc = async (funcionario) => {
    
    const { email, telefone, idDepart, id } = funcionario;
    let queryValue = {
        query: `UPDATE ${static.strings.TABLE_FUNCIONARIOS} SET email = ?, telefone = ?, idDepart = ? WHERE id = ?`,
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
        query: `DELETE FROM ${static.strings.TABLE_FUNCIONARIOS} WHERE id = ?`,
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