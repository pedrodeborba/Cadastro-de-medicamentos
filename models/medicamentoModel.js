const db = require('./db');

const Medicamento = db.sequelize.define('medicamentos', {
    nome: { 
        type: db.Sequelize.STRING
    },
    descricao: {
        type: db.Sequelize.TEXT
    },
    indicacao: {
        type: db.Sequelize.TEXT
    },
    modoUso: {
        type: db.Sequelize.TEXT
    },
    efeitosColaterais: {
        type: db.Sequelize.TEXT
    }
});

module.exports = Medicamento;
