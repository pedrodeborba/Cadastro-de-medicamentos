const express = require('express'); 
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require ('body-parser'); 
const session = require ('express-session');
const config = require('./config/config.json');

//Middleware
const middleware = require ('./middlewares/middlewares');

//Models
const Medicamento = require('./models/medicamentoModel');

//Controllers
const medicamentoController = require('./controllers/medicamentoController');
const homeController = require('./controllers/homeController');
const usuarioController = require("./controllers/usuarioController");
const registerController = require('./controllers/registerController');

const app = express();
const port = config.port;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({ 
    secret: "cadastrodemedicamentos",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('layout', './layouts/default/index');

// ====================================ROTAS=============================================================
app.get('/', middleware.verifySpecialRoutes, (req, res) => {
    res.redirect('/usuarioLogin');
});

app.get('/usuarioLogin', middleware.verifySpecialRoutes, (res,req) =>{
    app.set('layout', './layouts/default/login');
    usuarioController.getUsuarioLogin(res,req);
});

app.post('/usuarioLogin', (req, res)=>{
    usuarioController.autenticar(req, res);
});

app.get('/usuarioRegister', middleware.verifySpecialRoutes, (req,res) =>{
    app.set('layout', './layouts/default/cadastro');
    registerController.getRegister(req,res);
});

app.post('/usuarioRegister', (req, res) => {
    registerController.cadastrar(req,res);
})

app.get('/home', middleware.verifyAuth, (req,res) =>{
    app.set('layout', './layouts/default/home');
    homeController.getView(req,res);
});

app.get('/medicamentos', middleware.verifyAuth, (req,res) =>{
    app.set('layout', './layouts/default/medicamentos');
    medicamentoController.getMedicamentos(req, res);
});

app.get('/lista', middleware.verifyAuth, function (req,res){
    Medicamento.findAll().then(function(posts){
        app.set('layout', './layouts/default/lista');
        res.render('layouts/default/lista', { pageTitle: 'Lista', posts: posts });
    });
});

app.post('/send', medicamentoController.sendMedicamento);

app.get('/delete/:id', function (req,res){
    Medicamento.destroy({where: {'id': req.params.id}}).then(function(){
        res.redirect('/lista');
    }).catch(function(err){
        res.send("Este medicamento não existe! "+ err);
    });
});

app.get('/editar/:id', function (req,res){
    Medicamento.findOne({_id: req.params.id}).then((edit) =>{
        app.set('layout', './layouts/default/edit');
        res.render('layouts/default/edit', { edit: edit });
    }).catch((err)=>{
        res.send("Este medicamento não existe! "+err);
    });
});

app.post('/editar/send', function (req,res){
    Medicamento.findOne({_id: req.body.id}).then((edit) =>{
        edit.nome = req.body.nome
        edit.descricao = req.body.descricao,
        edit.indicacao = req.body.indicacao
        edit.modoUso = req.body.modoUso
        edit.efeitosColaterais = req.body.efeitosColaterais
        edit.save().then(()=>{
            res.redirect('/lista');
        })
    }).catch((err)=>{
        res.send("Este medicamento não existe! "+err);
    });
});

app.get('/logout', middleware.verifyAuth, function (req,res){
    usuarioController.logout(req,res);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
