const controllers = require('../controllers/departamentos.ctrl');
const static = require('../static');

exports.getAllDepart = (req, res, next)=>{
    static.utils_functions.printRequest(req);
    try{
        static.utils_functions.printRequest(req);
        return controllers.getAllDepart(req, res, next);
    }catch(error){                   
        return next({      
            status: error.status || undefined,
            operation: error.operation || undefined,      
            endpoint: 'Obter Departamentos',            
            errorMessage: error.message || error
        });
    }
}

exports.createDepart = (req, res, next)=>{
    static.utils_functions.printRequest(req);
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

exports.attDepart = (req, res, next)=>{      
    static.utils_functions.printRequest(req);
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

exports.deleteDepart = (req, res, next)=>{   
    static.utils_functions.printRequest(req); 
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