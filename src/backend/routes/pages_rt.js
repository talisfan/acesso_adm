const express = require('express');
const router = express.Router();

// HOME
router.get('/', (req, res) => {
    console.log('\n// Página HOME chamada.');    
    res.render('Escolha');
});

router.get('/alterarDepart', (req, res) => {

    console.log('\n// Página alterarDepart chamada. Request:');
    console.log('--REQUEST:');
    console.log(req);

    if (req.params) {
        let params = {};

        for (const prop in req.params) {
            params[prop] = req.params[prop];
        }        

        res.render('AlterarDepart', params);
    } else {
        res.render('AlterarDepart');
    }
});

router.get('/cadDepart', (req, res) => {
    
    console.log('\n// Página cadDepart chamada.');       
    res.render('CadDepart');
});

router.get('/cadFunc', (req, res) => {

    console.log('\n// Página cadFunc chamada.');    
    res.render('CadFunc');
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

        res.render('AlterarFunc', params);

    } else {
        res.render('AlterarFunc');
    }
});

router.get('/buscaFunc', (req, res, next) => {

    console.log('\n// Página buscaFunc chamada.');    
    res.render('BuscaFunc');
});


module.exports = router;