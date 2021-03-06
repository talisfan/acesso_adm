const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const handlebars = require('express-handlebars');

//Template engine
app.engine('handlebars', handlebars({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Arquivos estaticos - CSS/IMGS/JS
//app.use(express.static(path.join(__dirname, 'assets')));

//ROTAS
const routeDepar = require('../routes/departamentos');
const routeFunc = require('../routes/funcionarios');

app.use('/departamentos', modelDepartamentos);
app.use('/funcionarios', modelFuncionarios);

//Pagina principal (HOME)
app.get('/', (req, res) => {
    //res.end(fs.readFileSync('views/index.html'));   
    res.render('Escolha');
});

//Alterar departamento com parametros
app.get('/alterarDepart/:idDepart/:nomeDepart', (req, res, next) =>{
    const id = req.params.idDepart;
    const nome = req.params.nomeDepart;
    res.render('AlterarDepart', {
        idDepart: id,
        nomeDepart: nome
    });
});

//Alterar departamento sem params
app.get('/alterarDepart', (req, res, next) =>{
    const id = req.params.idDepart;
    const nome = req.params.nomeDepart;
    res.render('AlterarDepart');
});

//Pagina de cadastro de departamentos
app.get('/cadDepart', (req, res) => {
    res.render('CadDepart');   
});

//Pagina de cadastro de funcionarios
app.get('/cadFunc', (req, res) => {
    res.render('CadFunc');   
});

//Alterar funcionario com parametros
app.get('/alterarFunc/:id/:nome/:email/:telefone/:idDepart', (req, res, next) =>{
    const id = req.params.id;
    const nome = req.params.nome;
    const email = req.params.email;
    const telefone = req.params.telefone;
    const idDepart = req.params.idDepart;    

    res.render('AlterarFunc', {
        id: id,
        nome: nome,
        email: email,
        telefone: telefone,
        idDepart: idDepart
    });
});

//Alterar funcionario sem params
app.get('/alterarFunc', (req, res, next) =>{   
    res.render('AlterarFunc');
});

//buscar funcionario 
app.get('/buscaFunc', (req, res, next) =>{   
    res.render('BuscaFunc');
});

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

//Caso rota informada não exista
app.use((req, res, next) => {
    const erro = new Error('Não encontrado.');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: "true",
        msg: error.message    
    });
});

const http = require('http');
const server = http.createServer(app);
server.listen(3000);

module.exports = app;