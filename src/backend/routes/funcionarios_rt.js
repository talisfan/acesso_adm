const express = require('express');
const router = express.Router();
const controller = require('../controller/funcionarios_ctrl');

router.get('/', (req, res, next) => {
    console.log('\n// ROUTE GET - Get All Functionarys');
    console.log('--REQUEST:');
    console.log(req);
    await controller.getFunc(req, res, next);
});

router.post('/', (req, res, next) => {
    console.log('\n// ROUTE POST - Create Functionary');
    console.log('--REQUEST:');
    console.log(req);
    await controller.createFunc(req, res, next);
});

router.patch('/', (req, res, next) => {
    console.log('\n// ROUTE PATCH - Update Functionary');
    console.log('--REQUEST:');
    console.log(req);
    await controller.attFunc(req, res, next);
});

router.delete('/:idFunc', (req, res, next) => {    
    console.log('\n// ROUTE DELETE - Delete Functionary');
    console.log('--REQUEST:');
    console.log(req);
    await controller.deleteFunc(req, res, next);
});

module.exports = router;