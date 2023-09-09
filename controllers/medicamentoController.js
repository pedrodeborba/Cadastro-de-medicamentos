const Medicamento = require("../models/medicamentoModel");
const medicamentos = [];

function getMedicamentos(req, res) {
  res.render("layouts/default/medicamentos", { erro: null });
}

function addMedicamento(req, res) {
  const { title } = req.body;
  const medicamento = new Medicamento(Date.now(), title, false);
  medicamentos.push(medicamento);
  res.redirect("/medicamentos");
}

function sendMedicamento(req, res) {
  const { nome, descricao, indicacao, modoUso, efeitosColaterais } = req.body;

  if (!nome || !descricao || !indicacao || !modoUso || !efeitosColaterais) {
    return res.render('medicamentos', { erro: 'Preencha todos os campos' });
  }

  if (nome.length < 3 ||descricao.length < 5 || indicacao.length < 5 ||modoUso.length < 5 || efeitosColaterais.length < 5) {
    return res.render('layouts/default/medicamentos', { erro: 'Informe valores válidos!' });
  }

  Medicamento.create({
    nome: nome,
    descricao: descricao,
    indicacao: indicacao,
    modoUso: modoUso,
    efeitosColaterais: efeitosColaterais
  })
    .then(function () {
      res.redirect('/lista');
    })
    .catch(function (err) {
      res.send("Erro ao cadastrar medicamento: " + err);
    });
}


function deleteMedicamento(req, res) {
    const { title } = req.body;
    medicamentos.delete({title});
    res.redirect('/medicamentos');
}

module.exports = { getMedicamentos, sendMedicamento, addMedicamento, deleteMedicamento };
