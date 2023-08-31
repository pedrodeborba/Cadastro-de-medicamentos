const Sequelize = require ('sequelize');

const sequelize = new Sequelize('mydb','root','12345678', {
    host: "localhost",
    dialect: 'mysql'
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

