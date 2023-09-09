const Usuario = require("../models/usuarioModel");
const crypto = require("crypto");

function getUsuarioLogin(req, res) {
  res.render("login", { erro: null });
}

async function autenticar(req, res) {
  const email = req.body.email;
  let senha = req.body.senha;

  //const token = config.token; 
  //localStorage.setItem('token', token);

  if (!email || !senha) {
    res.render("layouts/default/login", { content: "login", erro: "Preencha todos os campos" });
  }

  senha = await crypto.createHash("md5").update(senha).digest("hex");

  Usuario.autenticar(email, senha)
    .then((user) => {
      if (user) {
        //Verificação bem sucedida
        req.session.usuario = {
          id: user.id,
          email: user.email,
        };
        res.redirect("/home");
      } else {
        res.render("login", { erro: "Credenciais inválidas" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.render("login", { erro: "Erro ao autenticar" });
    });
}

function logout(req, res) {
  delete req.session.usuario;
  res.redirect("/usuarioLogin");
}

module.exports = { getUsuarioLogin, autenticar, logout };
