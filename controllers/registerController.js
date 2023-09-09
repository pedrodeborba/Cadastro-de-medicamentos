const Usuario = require("../models/usuarioModel");
const crypto = require('crypto');

function getRegister(req, res) {
    res.render('layouts/default/cadastro', { erro: null});
}

async function cadastrar (req, res) {
    const email = req.body.email;
    let senha = req.body.senha;
    const confirmSenha = req.body.confirmSenha;

    if (!email || !senha || !confirmSenha) {
        res.render('cadastro', { erro: 'Preencha todos os campos'});
    } 
    else if (senha.length < 8){
        res.render('cadastro', { erro: 'A senha deve ter no mínimo 8 caracteres'});
    } 
    else if (senha !== confirmSenha) {
        res.render('cadastro', { erro: 'As senhas não coincidem'});
    } else {


        const user = await Usuario.getEmail(email);


        if (user) {
            res.render('cadastro', { erro: 'Email já cadastrado'});
        }else{
            senha = await crypto.createHash('md5').update(senha).digest('hex');


            // Realizar o cadastro
            Usuario.create({ email, senha })
                .then(() => {
                    // Cadastro realizado com sucesso, redirecionar para a tela de login
                    res.redirect('/usuarioLogin');
                })
                .catch(error => {
                    console.error(error);
                    res.render('cadastro', { erro: 'Erro ao cadastrar' });
                });
        }

    }
}

module.exports = { getRegister, cadastrar };
