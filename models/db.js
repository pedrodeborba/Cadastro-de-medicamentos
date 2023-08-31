const Sequelize = require ('sequelize');
const defaultConfig = require('../config/config.json');
const sequelize = new Sequelize(defaultConfig.database, defaultConfig.user, defaultConfig.password, {
    host: defaultConfig.host,
    dialect: defaultConfig.dialect
});

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!");
}).catch(function(err){
    console.log("Erro na conexão: "+ err);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}

