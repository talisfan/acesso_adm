const model = require('../model/departamentos_mdl');

exports.getAllDepart = async(req, res, next)=>{
    await model.getAllDepart(req, res, next);
}

exports.createDepart = async(req, res, next)=>{
    if(req.body.nomeDepart){
        await model.createDepart(req, res, next);
    }else{
        return res.status(400).send({
            error: true,
            errorMessage: 'Parameter "nomeDepart" undefined.'
        });
    }
}

exports.attDepart = async(req, res, next)=>{
    await model.attDepart(req, res, next);
}

exports.deleteDepart = async(req, res, next)=>{
    await model.deleteDepart(req, res, next);
}