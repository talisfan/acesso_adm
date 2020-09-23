const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//ROTAS
const rotaDepartamentos = require('./routes/departamentos');
const rotaFuncionarios = require('./routes/funcionarios');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use('/departamentos', rotaDepartamentos);
app.use('/funcionarios', rotaFuncionarios);

//CORS
app.use((req, res, next) => {    
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Header', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methds', 'PUT, POST, PATCH, DELETE, GET'); 
        return res.status(200).send({});        
    }
    next();
});

//Caso rota informada não exista
app.use((req, res, next) => {
    const erro = new Error('Não encontrado.');
    erro.status = 404;
    next(erro);
});

//Caso demore na conexao por exemplo
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: "true",
        msg: error.message    
    });
});

module.exports = app;