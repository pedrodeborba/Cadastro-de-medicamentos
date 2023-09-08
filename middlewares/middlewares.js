//const jwt = require("jsonwebtoken");
//const config = require("../config/config.json");

function verifyAuth(req, res, next) {
  if (req.session.usuario) {
    next();
  } else {
    res.redirect("/usuarioLogin");
  }
}

function verifySpecialRoutes(req, res, next) {
  if (req.session.usuario) {
    res.redirect("/home");
  } else {
    next();
  }
}

// function criarToken(usuario) {
//   const payload = {
//     id: usuario.id,
//     email: usuario.email,
//   };
//   return jwt.sign(payload, config.token, { expiresIn: "1h" });
// }

// function validarToken(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.redirect('/usuarioLogin');
//   }

//   jwt.verify(token, config.token, (err, decoded) => {
//     if (err) {
//       return res.redirect('/usuarioLogin');
//     }

//     req.usuario = decoded;
//     next();
//   });
// }

module.exports = {
  verifyAuth,
  verifySpecialRoutes,
  //criarToken,
  //validarToken
};
