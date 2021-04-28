const express = require('express');
const router = express.Router();

// HOME
router.get('/', (req, res) => {
    console.log('\n// Página HOME chamada.');    
    return res.render('Escolha');
});

router.get('/funcionarios', (req, res) => {
    console.log('\n// Página Funcionarios chamada.');    
    return res.render('AcessoFuncionarios');
});

router.get('/alterarDepart', async (req, res) => {

    console.log('\n// Página alterarDepart chamada. Request:');
    console.log('--REQUEST:');
    console.log(req);

    if (req.params) {
        let params = {};

        for (const prop in req.params) {
            params[prop] = req.params[prop];
        }        

        return res.render('AlterarDepart', params);
    } else {
        return res.render('AlterarDepart');
    }
});

router.get('/cadDepart', async (req, res) => {
    
    console.log('\n// Página cadDepart chamada.');       
    return res.render('CadDepart');
});

router.get('/cadFunc', async (req, res) => {

    console.log('\n// Página cadFunc chamada.');    
    return res.render('CadFunc');
});

router.get('/alterarFunc', async (req, res) => {

    console.log('\nPágina alterarFunc chamada. Request:');
    console.log('--REQUEST:');
    console.log(req);

    if (req.params) {
        let params = {};

        for (const prop in req.params) {
            params[prop] = req.params[prop];
        }

        return res.render('AlterarFunc', params);

    } else {
        return res.render('AlterarFunc');
    }
});

router.get('/buscaFunc', async (req, res, next) => {

    console.log('\n// Página buscaFunc chamada.');    
    return res.render('BuscaFunc');
});


module.exports = router;