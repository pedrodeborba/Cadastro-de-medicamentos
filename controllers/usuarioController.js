const usuario = require("../models/usuarioModel");

function getLogin(req, res) {
    res.render('login', { erro: null});
}

function autenticar(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;

    if (!email || !senha) {
        // Campos vazios, renderizar página de login com mensagem de erro
        res.render('login', { content: 'login', erro: 'Preencha todos os campos' });
    }

    usuario.autenticar(email, senha)
        .then(user => {
            if (user) {
                // Usuário autenticado, redirecionar para a tela de home
                res.redirect('/home');
            } else {
                // Credenciais inválidas, renderizar página de login com mensagem de erro
                res.render('login', { erro: 'Credenciais inválidas' });
            }
        })
        .catch(error => {
            console.error(error);
            res.render('login', { erro: 'Erro ao autenticar' });
        });
}



module.exports = {getLogin, autenticar};