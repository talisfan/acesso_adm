const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const handlebars = require('express-handlebars');

const routePages = require('../routes/pages_rt');
const routeDepart = require('../routes/departamentos_rt');
const routeFunc = require('../routes/funcionarios_rt');

//Template engine
app.engine('handlebars', handlebars({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Arquivos estaticos - CSS/IMGS/JS
//app.use(express.static(path.join(__dirname, 'assets')));

//CORS
app.use((req, res, next) => {    
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Header', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); 
        return res.status(200).send();        
    }
    next();
});

app.use('/', routePages);
app.use('/departamentos', routeDepart);
app.use('/funcionarios', routeFunc);

app.use((error, req, res, next) => {

    console.log('\n===== ERROR =====');
    console.log(error);

    return res.status(error.status || 500)
    .send({
        error: true,
        errorDesciption: error
    });
});

//Caso rota informada não exista
app.use((req, res) => {
    return res.status(404).send();
});

const http = require('http');
const server = http.createServer(app);
server.listen(3000);

module.exports = app;