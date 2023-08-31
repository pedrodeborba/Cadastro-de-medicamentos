const usuario = require("../models/usuarioModel");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

function getLogin(req, res) {
    res.render('login', { erro: null});
}


const buildtoken = async (id) => {
    if (id > 0) {
      return jwt.sign({ id }, config.token, { expiresIn: 43200 });
    }
    return false;
};

const validarToken = async (token) => jwt.verify(token, config.keys.token, (err) => {
    if (err) {
      return false;
    }
    return true;
});
  
async function autenticar(req, res) {
    const email = req.body.email;
    let senha = req.body.senha;

    if (!email || !senha) {
        // Campos vazios, renderizar página de login com mensagem de erro
        res.render('login', { content: 'login', erro: 'Preencha todos os campos' });
    }

    senha = await crypto.createHash('md5').update(senha).digest('hex');

    usuario.autenticar(email, senha)
        .then(user => {
            if (user) {

                const token = buildtoken(user.id);

                // ARMAZENAR O TOKEN NO LOCALSTORAGE
                // Usar ele no cabecalho da requisicao de criar e listar medicamentos
                // Usar a função validarToken PARA VERIFICAR SE O TOKEN É VALIDO, ela ta ali em cima 

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