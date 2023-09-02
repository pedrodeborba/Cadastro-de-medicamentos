const db = require('./db');

const Medicamento = db.sequelize.define('medicamentos', {
    nome: { 
        type: db.Sequelize.STRING
    },
    indicacao: {
        type: db.Sequelize.STRING
    },
    modoUso: {
        type: db.Sequelize.STRING
    },
    efeitosColaterais: {
        type: db.Sequelize.STRING
    }
});

module.exports = Medicamento;
