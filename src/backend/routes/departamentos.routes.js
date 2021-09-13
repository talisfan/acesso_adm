const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/departamentos.mid');


router.get('/', middlewares.getAllDepart);

router.post('/', middlewares.createDepart);

router.patch('/', middlewares.attDepart);

router.delete('/:idDepart', middlewares.deleteDepart);

module.exports = router;