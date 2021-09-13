const controllers = require('../controllers/funcionario.ctrl');
const static = require('../static');

exports.getFunc = async(req, res, next)=>{
    try{
        return await controllers.getFunc(req, res, next);
    }catch(error){       
        return next({      
            status: error.status || undefined,
            operation: error.operation || undefined,      
            endpoint: 'Obter funcionários',            
            errorMessage: error.message || error
        });
    }
}

exports.createFunc = async(req, res, next)=>{
    try{
        if(
            req.body && req.body.nome && req.body.telefone 
            && req.body.email && req.body.acesso && req.body.senha 
            && req.body.confSenha && req.body.departamento 
        ){    
            if(req.body.departamento == '*DEPARTAMENTO' || req.body.acesso == '*NIVEL DE ACESSO'){
                return next({     
                    status: 400,              
                    errorMessage: 'Missing required properties.'
                });
            }
            if(req.body.senha != req.body.confSenha){
                return next({     
                    status: 400,              
                    errorMessage: 'As senhas não conferem.'
                });
            }           
            if(req.body.senha.length < 6){
                return next({     
                    status: 400,              
                    errorMessage: 'A senha deve ter no mínimo 6 caracteres.'
                });
            }

            return await controllers.createFunc(req, res, next);            
        }else{
            return next({     
                status: 400,              
                errorMessage: 'Missing required properties.'
            });
        }
    }catch(error){       
        return next({      
            status: error.status || undefined,             
            errorMessage: error.message || error
        });
    }
}

exports.attFunc = async(req, res, next)=>{          
    return await controllers.attFunc(req, res, next);            
}

exports.deleteFunc = async(req, res, next)=>{    
    if(req.params && req.params.idFunc && req.params.idFunc > 0){
        return await controllers.deleteFunc(req, res, next);                  
    }else{
        return next({     
            status: 400,              
            errorMessage: 'Missing required parameter "idFunc".'
        });
    }
}