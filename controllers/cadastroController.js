const Usuario = require("../models/usuarioModel");

function getCadastro(req, res) {
    res.render('cadastro', { erro: null});
}

function cadastrar(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    const confirmSenha = req.body.senha;

    if (!email || !senha || !confirmSenha) {
        // Campos vazios, renderizar página de cadastro com mensagem de erro
        res.render('cadastro', { erro: 'Preencha todos os campos' });
    } else if (senha !== confirmSenha) {
        // Senhas não coincidem, renderizar página de cadastro com mensagem de erro
        res.render('cadastro', { erro: 'As senhas não coincidem' });
    } else {
        // Realizar o cadastro
        Usuario.create({ email, senha })
            .then(() => {
                // Cadastro realizado com sucesso, redirecionar para a tela de login
                res.redirect('/login');
            })
            .catch(error => {
                console.error(error);
                res.render('cadastro', { erro: 'Erro ao cadastrar' });
            });
    }
}

module.exports = { getCadastro, cadastrar };
