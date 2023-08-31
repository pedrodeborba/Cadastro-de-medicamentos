const express = require('express'); 
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require ('body-parser'); 
const config = require('./config/config.json');

//Modulos
const Medicamento = require('./models/medicamentoModel');

//Controllers
const medicamentoController = require('./controllers/medicamentoController');
const homeController = require('./controllers/homeController');
const usuarioController = require("./controllers/usuarioController");
const cadastroController = require('./controllers/cadastroController');

const app = express();
const port = config.port;

app.set('view engine', 'ejs');// declarando ejs como tempalte engine
app.use(expressLayouts);
app.use(express.static('public')); //public para adicionar css
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true})); //Configurando Body-Parser
app.use(bodyParser.json());
// Configurar layout globalmente
app.set('layout', './layouts/default/index');

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (res, req) =>{
    app.set('layout', './layouts/default/login');
    usuarioController.getLogin(res,req);
});

app.post('/login', (req, res)=>{
    usuarioController.autenticar(req, res);
});

app.get('/cadastro' , (req,res) =>{
    app.set('layout', './layouts/default/cadastro');
    cadastroController.getCadastro(req,res);
});

app.post('/cadastro', (req, res) => {
    cadastroController.cadastrar(req,res);
})

app.get('/home', (req,res) =>{
    app.set('layout', './layouts/default/home');
    homeController.getView(req,res);
});

//Formulario para adicionar medicamento
app.get('/medicamentos', (req,res) =>{
    app.set('layout', './layouts/default/medicamentos');
    medicamentoController.getMedicamentos(req, res);
});

app.get('/lista', function (req,res){
    Medicamento.findAll().then(function(posts){
        app.set('layout', './layouts/default/lista');
        res.render('layouts/default/lista', { pageTitle: 'Lista', posts: posts });
    });
});

app.post('/send', function (req,res){
    Medicamento.create({
        nome: req.body.nome,
        indicacao: req.body.indicacao,
        modoUso: req.body.modoUso,
        efeitosColaterais: req.body.efeitosColaterais
    }).then(function(){
        res.redirect('/lista'); 
    }).catch(function(err){
        res.send("Erro ao cadastrar medicamento: "+ err);
    })
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
