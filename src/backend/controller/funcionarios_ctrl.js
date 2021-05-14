const model = require('../model/funcionarios_mdl');
const queryAccepted = require('../middleware/queryAccepted');

exports.getFunc = async(req, res, next)=>{
    if(req.query && req.query.nome){
        if(!queryAccepted(req.query.nomeFunc)){                    
            return next({     
                status: 400,              
                errorMessage: 'QueryString "nome" contains invalid characters.'
            });
        }  
    }
    return await model.getFunc(req, res, next);
}

exports.createFunc = async(req, res, next)=>{
    if(
        req.body && req.body.nome && req.body.cpf && req.body.telefone 
        && req.body.email && req.body.acesso && req.body.senha && req.body.idDepart
        ){        
        return await model.createFunc(req, res, next);            
    }else{
        return next({     
            status: 400,              
            errorMessage: 'Missing required properties.'
        });
    }
}

exports.attFunc = async(req, res, next)=>{          
    return await model.attFunc(req, res, next);            
}

exports.deleteFunc = async(req, res, next)=>{    

    if(req.params && req.params.idFunc && req.params.idFunc > 0){
        return await model.deleteFunc(req, res, next);                  
    }else{
        return next({     
            status: 400,              
            errorMessage: 'Missing parameter "idFunc".'
        });
    }
}