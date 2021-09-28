const controllers = require('../controllers/funcionario.ctrl');
const { utils_functions } = require('../static');

exports.getFunc = async(req, res, next)=>{
    try{
        const buscaFunc = { 
            campo: req.query.nome ? 'nome' : (req.params.idFunc ? 'id' : null),
            valor: req.query.nome || req.params.idFunc || null
        }

        const response = await controllers.getFunc(buscaFunc);
        utils_functions.printResponse(response, 200);
        return res.status(200).send(response);
    }catch(error){       
        return next(error);
    }
}

exports.createFunc = async(req, res, next)=>{
    try{
        var funcionario = {
            nome: req.body.nome,
            telefone: req.body.telefone,
            email: req.body.email,
            acesso: req.body.acesso,
            senha: req.body.senha, 
            confSenha: req.body.confSenha,
            departamento: req.body.departamento 
        }
    }catch(error){
        return next({     
            status: 400,              
            errorMessage: 'Missing required parameters'
        });
    }

    
    if(funcionario.departamento === '*DEPARTAMENTO' || funcionario.acesso === '*NIVEL DE ACESSO'){
        return next({     
            status: 400,              
            errorMessage: 'Missing required properties.'
        });
    }
    if(funcionario.senha !== funcionario.confSenha){
        return next({     
            status: 400,              
            errorMessage: 'As senhas não conferem.'
        });
    }           
    if(funcionario.length < 6){
        return next({     
            status: 400,              
            errorMessage: 'A senha deve ter no mínimo 6 caracteres.'
        });
    }
    

    try{               
        console.log(`[FUNCIONARIOS][POST]: Criando funcionário ${funcionario.nome}...`);       
        const response = await controllers.createFunc(funcionario);   
        utils_functions.printResponse(response, 201);
        return res.status(201).render('SucessoFunc', response);                                   
    }catch(error){       
        return next(error);
    }
}

exports.attFunc = async(req, res, next)=>{          
    try{
        var funcionario = {
            id: req.body.idFunc,
            email: req.body.email,
            telefone: req.body.telefone,
            idDepart: req.body.idDepart
        }
    }catch(error){
        return next({     
            status: 400,              
            errorMessage: 'Missing required parameters'
        });
    }

    try{        
        console.log(`[FUNCIONARIOS][PATCH]: Atualizando funcionário ${funcionario.id}...`);

        const response = await controllers.attFunc(funcionario);            
        utils_functions.printResponse(response, 200);
        return res.status(200).render('SucessoFunc', response);
    }catch(error){
        return next(error);
    }    
}

exports.deleteFunc = async(req, res, next)=>{        
    if(req.params && req.params.idFunc && req.params.idFunc > 0){
        const id = req.body.idFunc;
        console.log(`[FUNCIONARIOS][DELETE]: Deletando funcionário ${id}...`);
        try{
            const response = await controllers.deleteFunc(id);                  
            utils_functions.printResponse(response, 202);
            return res.status(202).render('SucessoFunc', response);
        }catch(error){
            return next(error);
        }        
    }else{
        return next({     
            status: 400,              
            errorMessage: 'Missing required parameter "idFunc".'
        });
    }
}