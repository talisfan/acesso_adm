const express = require('express');
const router = express.Router();
const controller = require('../controller/departamentos_ctrl');

router.get('/', (req, res, next) => {
    console.log('\n// ROUTE GET - Get All Departments');
    console.log('--REQUEST:');
    console.log(req);
    await controller.getAllDepart(req, res, next);
});

router.post('/', (req, res, next) => {
    console.log('\n// ROUTE POST - Create Department');
    console.log('--REQUEST:');
    console.log(req);
    await controller.createDepart(req, res, next);
});

router.patch('/', (req, res, next) => {
    console.log('\n// ROUTE PATCH - Update Department');
    console.log('--REQUEST:');
    console.log(req);
    await controller.attDepart(req, res, next);
});

router.delete('/:idDepart', (req, res, next) => {    
    console.log('\n// ROUTE DELETE - Delete Department');
    console.log('--REQUEST:');
    console.log(req);
    await controller.deleteDepart(req, res, next);
});

module.exports = router;