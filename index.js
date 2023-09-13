require ('dotenv').config();
const express = require('express'); 
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require ('body-parser'); 
const session = require ('express-session');

// ====================================Middleware=============================================================
const middleware = require ('./middlewares/middlewares');

// ====================================Models=============================================================
const Medicamento = require('./models/medicamentoModel');

// ====================================Controllers=============================================================
const medicamentoController = require('./controllers/medicamentoController');
const homeController = require('./controllers/homeController');
const usuarioController = require("./controllers/usuarioController");
const registerController = require('./controllers/registerController');

const app = express();
const port = process.env.DB_PORT;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('layout', './layouts/default/index');

// ====================================ROTAS=============================================================
app.get('/', middleware.verifySpecialRoutes, (req, res) => { res.redirect('/usuarioLogin') });

app.get('/usuarioLogin', middleware.verifySpecialRoutes, (res,req) =>{ usuarioController.getUsuarioLogin(res,req,app) }); 

app.post('/usuarioLogin', usuarioController.autenticar);

app.get('/usuarioRegister', middleware.verifySpecialRoutes, (req,res) =>{ registerController.getRegister(req,res,app) });

app.post('/usuarioRegister', registerController.cadastrar);

app.get('/home', middleware.verifyAuth, (req,res) =>{ homeController.getView(req,res,app) });

app.get('/medicamentos', middleware.verifyAuth, (req,res) =>{ medicamentoController.getMedicamentos(req,res,app) });

app.get('/lista', middleware.verifyAuth, (req,res)=>{ medicamentoController.listarMedicamento(req,res,app) });

app.post('/send', medicamentoController.sendMedicamento);

app.get('/delete/:id', medicamentoController.deleteMedicamento);

app.get('/editar/:id', (req,res) => { medicamentoController.editarMedicamento(req,res,app) });

app.post('/editar/send', medicamentoController.editSendMedicamento);

app.get('/logout', middleware.verifyAuth, usuarioController.logout);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
