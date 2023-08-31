const Usuario = require("../models/usuarioModel");
const crypto = require('crypto');

function getCadastro(req, res) {
    res.render('cadastro', { erro: null});
}

async function cadastrar (req, res) {
    const email = req.body.email;
    let senha = req.body.senha;
    const confirmSenha = req.body.confirmSenha;

    if (!email || !senha || !confirmSenha) {
        // Campos vazios, renderizar página de cadastro com mensagem de erro
        res.render('cadastro', { erro: 'Preencha todos os campos' });
    } else if (senha !== confirmSenha) {
        // Senhas não coincidem, renderizar página de cadastro com mensagem de erro
        res.render('cadastro', { erro: 'As senhas não coincidem' });
    } else {


        const user = await Usuario.getEmail(email);


        if (user) {
            // Usuário já cadastrado, renderizar página de cadastro com mensagem de erro
            res.render('cadastro', { erro: 'Email já cadastrado' });
        }

        senha = await crypto.createHash('md5').update(senha).digest('hex');


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
