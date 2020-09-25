const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    var nome = req.body.nome;
    var cpf = req.body.cpf;

    console.log(nome, cpf);
});

module.exports = router;