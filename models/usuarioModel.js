const db = require('./db');

const Usuario = db.sequelize.define('usuario', {
    email: {
        type: db.Sequelize.STRING 
    },
    senha: {
        type: db.Sequelize.STRING
    }
});

// Função de autenticação
Usuario.autenticar = function(email, senha) {
    return Usuario.findOne({ where: { email: email, senha: senha } })
        .then(user => {
            if (user) {
                // Usuário autenticado
                return user;
            } else {
                // Usuário não encontrado ou senha incorreta
                return null;
            }
        })
        .catch(error => {
            throw error;
        });
};

module.exports = Usuario;
