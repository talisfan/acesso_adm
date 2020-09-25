const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    var userLogin = req.body.userLogin;
    var passLogin = req.body.passLogin;

    if(!userLogin || !passLogin){
        res.render('index', {erro: 'Credenciais inválidas'});
    }else{
        
        res.redirect(`/funcionarios/${userLogin}/${passLogin}`);
    }
});

module.exports = router;