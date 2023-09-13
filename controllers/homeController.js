const Medicamento = require ("../models/medicamentoModel");

async function getView(req,res,app) { 
    try {
        const medicamentos = await Medicamento.findAll();
    
        app.set('layout', './layouts/default/home');
        res.render('layouts/default/home', { medicamentos: medicamentos });
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar medicamentos');
    }
}

function btnEntrar(req, res) { 
    res.redirect('/medicamentos'); 
}

module.exports = { getView, btnEntrar };