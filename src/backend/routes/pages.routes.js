const express = require('express');
const router = express.Router();

router.get('/funcionarios', (req, res) => {
    console.log('\n// Página Funcionarios chamada.');    
    return res.render('ListaFuncionarios');
});

router.get('/departamentos', (req, res) => {
    console.log('\n// Página Departamentos chamada.');    
    return res.render('ListaDepartamentos');
});

router.get('/alterarDepart', (req, res) => {
    console.log('\n// Página alterarDepart chamada. Request:');
    console.log('--REQUEST:');
    
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

router.get('/alterarFunc/:id', (req, res) => {
    console.log('\nPágina alterarFunc chamada. Request:');
    console.log('--REQUEST:');

    if (req.params) {
        return res.render('AlterarFunc', req.params);
    } else {
        return res.render('AlterarFunc');
    }
});

router.get('/alterarDepart/:id', (req, res) => {
    console.log('\nPágina alterarDepart chamada. Request:');
    console.log('--REQUEST:');

    if (req.params) {
        return res.render('AlterarDepart', req.params);
    } else {
        return res.render('AlterarDepart');
    }
});

router.get('/buscaFunc', (req, res, next) => {
    console.log('\n// Página buscaFunc chamada.');    
    return res.render('BuscaFunc');
});

router.get('/errorPage', (req, res, next)=>{
    res.render('ErrorPage');
});

module.exports = router;