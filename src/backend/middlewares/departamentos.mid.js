const controllers = require('../controllers/departamentos.ctrl');
const utils_functions = require('../static/utils_functions');

exports.getAllDepart = async (req, res, next)=>{
    try{        
        const buscaFunc = { 
            campo: req.params.idDepart ? 'idDepart' : null,
            valor: req.params.idDepart || null
        }

        const response = await controllers.getDepart(buscaFunc);
        if (response.length == 0) {                    
            console.log('\nSem departamentos cadastrados.');
            const response = {error: true, msg: "Sem departamentos cadastrados"};
            utils_functions.printResponse(response)
            return res.status(404).send(response);
        }  
                
        const status = 200;
        utils_functions.printResponse(response, status);
        return res.status(status).send(response);
    }catch(error){                   
        return next({      
            status: error.status || undefined,
            operation: error.operation || undefined,      
            endpoint: 'Obter Departamentos',            
            errorMessage: error.message || error
        });
    }
}

exports.createDepart = async (req, res, next)=>{
    try{
        if(req.body && req.body.nomeDepart){             
            return controllers.createDepart(req, res, next);                
        }else{        
            return next({     
                status: 400,              
                errorMessage: "Missing required property 'nomeDepart'."
            });
        }
    }catch(error){       
        return next({      
            status: error.status || undefined,
            operation: error.operation || undefined,      
            endpoint: 'Criar Departamento',            
            errorMessage: error.message || error
        });
    }
}

exports.attDepart = async (req, res, next)=>{      
    try{
        if(req.query && req.query.nomeDepart && req.query.idDepart && req.query.idDepart > 0){        
            return controllers.attDepart(req, res, next);        
        }else{
            return next({     
                status: 400,              
                errorMessage: 'Missing required parameters "nomeDepart" and / or "idDepart".'
            });
        }
    }catch(error){       
        return next({      
            status: error.status || undefined,
            operation: error.operation || undefined,      
            endpoint: 'Atualizar Departamento',            
            errorMessage: error.message || error
        });
    }
}

exports.deleteDepart = async (req, res, next)=>{   
    try{
        if(req.params && req.params.idDepart && req.params.idDepart > 0){        
            return controllers.deleteDepart(req, res, next);                
        }else{
            return next({     
                status: 400,              
                errorMessage: 'Missing required parameter "idDepart".'
            });
        }
    }catch(error){       
        return next({      
            status: error.status || undefined,
            operation: error.operation || undefined,      
            endpoint: 'Deletar Departamento',            
            errorMessage: error.message || error
        });
    }
}