const model = require('../model/departamentos_mdl');
const queryAccepted = require('../middleware/queryAccepted');

exports.getAllDepart = async(req, res, next)=>{
    await model.getAllDepart(req, res, next);
}

exports.createDepart = async(req, res, next)=>{
    if(req.body && req.body.nomeDepart){

        if(!queryAccepted(req.body.nomeDepart)){        
            await model.createDepart(req, res, next);
        }else{
            return next(new Error({     
                status: 400,              
                errorMessage: 'Property "nomeDepart" contains invalid characters.'
            }));
        }        
    }else{
        return next(new Error({     
            status: 400,              
            errorMessage: 'Missing property "nomeDepart".'
        }));
    }
}

exports.attDepart = async(req, res, next)=>{
      
    if(req.body && req.body.nomeDepart && req.body.idDepart && req.body.idDepart > 0){

        if(!queryAccepted(req.body.nomeDepart)){        
            await model.attDepart(req, res, next);
        }else{
            return next(new Error({     
                status: 400,              
                errorMessage: 'Property "nomeDepart" contains invalid characters.'
            }));
        }
    }else{
        return next(new Error({     
            status: 400,              
            errorMessage: 'Missing parameters "nomeDepart" & "idDepart".'
        }));
    }
}

exports.deleteDepart = async(req, res, next)=>{    
    if(req.body && req.params.idDepart && req.params.idDepart > 0){
        await model.deleteDepart(req, res, next);
    }else{
        return next(new Error({     
            status: 400,              
            errorMessage: 'Missing parameter "idDepart".'
        }));
    }
}