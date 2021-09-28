const express = require('express');
const router = express.Router();
const controller = require('../middlewares/funcionarios.mid');

router.get('/', controller.getFunc);

router.get('/:idFunc', controller.getFunc);

router.post('/', controller.createFunc);

router.patch('/', controller.attFunc);

router.delete('/:idFunc', controller.deleteFunc);

module.exports = router;