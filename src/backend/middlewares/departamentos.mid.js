const controllers = require('../controllers/departamentos.ctrl');
const utils_functions = require('../static/utils_functions');

exports.getAllDepart = async (req, res, next)=>{
    try{        
        const busca = {
            campo: req.params.idDepart ? 'idDepart' : 'nomeDepart',
            value: req.params.idDepart || req.query.nome || null
        }
        const response = await controllers.getDepart(busca);

        if (response.length == 0) {                    
            console.log('\nSem departamentos cadastrados.');
            const response = { 
                error: true, 
                msg: "Sem departamentos cadastrados"
            };
            utils_functions.printResponse(response, 404)
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
            const response = controllers.createDepart(req.body.nomeDepart);                
            const status = 201;
            utils_functions.printResponse(response, status);
            return res.status(status).send();
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
        if(req.body && req.body.nomeDepart && req.body.idDepart && req.body.idDepart > 0){        
            const response = controllers.attDepart(req.body.idDepart, req.body.nomeDepart);        
            const status = 202;          
            utils_functions.printResponse(response, status);
            return res.status(status).send(response);
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