const model = require('../model/funcionarios_mdl');
const queryAccepted = require('../middleware/queryAccepted');

exports.getFunc = async(req, res, next)=>{
    await model.getAllFunc(req, res, next);
}

exports.createFunc = async(req, res, next)=>{
    if(req.body && req.body.nomeFunc){

        if(!queryAccepted(req.body.nomeFunc)){        
            await model.createFunc(req, res, next);
        }else{
            return next(new Error({     
                status: 400,              
                errorMessage: 'Property "nomeFunc" contains invalid characters.'
            }));
        }        
    }else{
        return next(new Error({     
            status: 400,              
            errorMessage: 'Missing property "nomeFunc".'
        }));
    }
}

exports.attFunc = async(req, res, next)=>{
      
    if(req.body && req.body.nome && req.body.idFunc && req.body.idFunc > 0){

        if(!queryAccepted(req.body.nome)){        
            await model.attFunc(req, res, next);
        }else{
            return next(new Error({     
                status: 400,              
                errorMessage: 'Property "nomeFunc" contains invalid characters.'
            }));
        }
    }else{
        return next(new Error({     
            status: 400,              
            errorMessage: 'Missing parameters "nomeFunc" & "idFunc".'
        }));
    }
}

exports.deleteFunc = async(req, res, next)=>{    
    if(req.body && req.params.idFunc && req.params.idFunc > 0){
        await model.deleteFunc(req, res, next);
    }else{
        return next(new Error({     
            status: 400,              
            errorMessage: 'Missing parameter "idFunc".'
        }));
    }
}