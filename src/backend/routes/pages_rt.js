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

router.get('/departamentos', (req, res) => {
    console.log('\n// Página Departamentos chamada.');    
    return res.render('AcessoDepartamentos');
});

router.get('/alterarDepart', (req, res) => {

    console.log('\n// Página alterarDepart chamada. Request:');
    console.log('--REQUEST:');
    console.log(req);

    console.log({
        method: req.method || undefined,
        endpoint: req.url || undefined,
        params: req.params || undefined,
        queryString: req.query || undefined,
        body: req.body || undefined
    });
    
    if (req.query) {        
        return res.render('AlterarDepart', { ...req.query });
    } else {
        return res.render('AlterarDepart');
    }
});

router.get('/cadDepart', (req, res) => {
    
    console.log('\n// Página cadDepart chamada.');       
    return res.render('CadDepart');
});

router.get('/cadFunc', (req, res) => {

    console.log('\n// Página cadFunc chamada.');    
    return res.render('CadFunc');
});

router.get('/alterarFunc', (req, res) => {

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

router.get('/buscaFunc', (req, res, next) => {

    console.log('\n// Página buscaFunc chamada.');    
    return res.render('BuscaFunc');
});


module.exports = router;