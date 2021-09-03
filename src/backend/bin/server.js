const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const utils_functions = require('../static/utils_functions');

const routes = require('../routes');

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
    }else{
        utils_functions.printRequest(req);
    }
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// HOME
app.get('/', async (req, res) => {
    console.log('\n// Página HOME chamada.');        
    return res.render('Home');
});

// Creation database in first access
app.get('/firstAccess', async(req, res)=>{
    console.log('\nFIRST ACCESS - CREATING DATABASE...')
    const firstCreationDatabase = require('./firstCreationDatabase');
    await firstCreationDatabase();
});

app.use('/page', routes.pages);
app.use('/departamentos', routes.departamentos);
app.use('/funcionarios', routes.funcionarios);

app.use((error, req, res, next) => {

    if(!error.status){
        error.status = 500;
    }
    console.error('\n===== ERROR =====');
    console.error(JSON.stringify(error));

    if(error && error.errorMessage && 
        typeof error.errorMessage == 'object')
    {
        const errorMessage = error.errorMessage;
        for(const prop in errorMessage){
            if(prop.includes('sql')){
                delete error.errorMessage[prop];
            }
        };
    }

    return res.status(error.status).send({
            error: true,
            errorDescription: error            
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