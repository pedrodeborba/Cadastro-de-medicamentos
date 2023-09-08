const Medicamento = require("../models/medicamentoModel");
const medicamentos = [];

function getMedicamentos(req, res) {
  res.render("medicamentos", {  pageTitle: 'Medicamentos'});
}

function addMedicamento(req, res) {
  const { title } = req.body;
  const medicamento = new Medicamento(Date.now(), title, false);
  medicamentos.push(medicamento);
  res.redirect("/medicamentos");
}

function deleteMedicamento(req, res) {
    const { title } = req.body;
    medicamentos.delete({title});
    res.redirect('/medicamentos');
}

module.exports = { getMedicamentos, addMedicamento, deleteMedicamento };
