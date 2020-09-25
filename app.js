const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const fs = require('fs');
const path = require('path');
const handlebars = require('express-handlebars');

//Template engine
app.engine('handlebars', handlebars({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Arquivos estaticos - CSS/IMGS/JS
app.use(express.static(path.join(__dirname, 'assets')));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

//ROTAS
const modelDepartamentos = require('./model/ModelDepartamentos');
const modelFuncionarios = require('./model/ModelFuncionarios');
const controllerCadastroFunc = require('./controller/ControllerCadFunc');
const controllerCadastroDepart = require('./controller/ControllerCadDepart');
const controllerLogin = require('./controller/ControllerLogin');

app.use('/departamentos', modelDepartamentos);
app.use('/funcionarios', modelFuncionarios);
app.use('/login', controllerLogin);
//app.use('/cadDepart', controllerCadastroDepart);
//app.use('/cadFunc', controllerCadastroFunc);

//Pagina principal (HOME)
app.get('/', (req, res) => {
    //res.end(fs.readFileSync('views/index.html'));   
    res.render('index');
});

app.get('/alterarDepart', (req, res, next) =>{
    res.render('AlterarDepart');
});

//Pagina para escolha de ação ADM
app.post('/viewEscolha', (req, res) => {
    res.render('ViewEscolha');   
});

//Pagina de funcionarios
app.get('/viewFuncionarios', (req, res) => {
    res.render('ViewFuncionarios');   
});

//Pagina de departamentos
app.get('/viewDepartamentos', (req, res) => {
    res.render('ViewDepartamentos');   
});

//Validacoes com ajax
app.post('/escolha', (req, res) => {
    res.send("escolha");   
});

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