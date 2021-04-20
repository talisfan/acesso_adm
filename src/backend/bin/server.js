const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');

const routePages = require('../routes/pages_rt');
const routeDepart = require('../routes/departamentos_rt');
const routeFunc = require('../routes/funcionarios_rt');

app.set('views', path.join(path.resolve(), '/src/frontend/views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Arquivos estaticos - CSS/IMGS/JS
app.use(express.static(path.join(path.resolve(), '/src/frontend/assets')));

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

    if(!error.status){
        error.status = 500;
    }
    console.log('\n===== ERROR =====');
    console.log(JSON.stringify(error));

    return res
        .status(error.status)
        .render('ErrorPage', {
            error: true,
            errorDescription: JSON.stringify(error),
            status: error.status
        });
});

//Caso rota informada não exista
app.use((req, res) => {
    return res.status(404).send();
});

const http = require('http');
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.log(`Servidor rodando na porta ${port}!`);

module.exports = app;