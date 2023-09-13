const Medicamento = require("../models/medicamentoModel");

function getMedicamentos(req, res,app) {
  app.set('layout', './layouts/default/medicamentos');
  res.render("layouts/default/medicamentos", { erro: null });
}

function sendMedicamento(req, res) {
  const { nome, descricao, indicacao, modoUso, efeitosColaterais } = req.body;

  if (!nome || !descricao || !indicacao || !modoUso || !efeitosColaterais) {
    return res.render('medicamentos', { erro: 'Preencha todos os campos' });
  }

  if (nome.length < 3 ||descricao.length < 5 || indicacao.length < 5 ||modoUso.length < 5 || efeitosColaterais.length < 5) {
    return res.render('layouts/default/medicamentos', { erro: 'Informe indicacaoes válidos!' });
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

function listarMedicamento (req,res,app){
  Medicamento.findAll().then(function(posts){
      app.set('layout', './layouts/default/lista');
      res.render('layouts/default/lista', { pageTitle: 'Lista', posts: posts });
  });
}

function editarMedicamento(req, res, app) {
  const medicationId = req.params.id;
  Medicamento.findByPk(medicationId).then((medication) => {
      if (!medication) {
          res.redirect('/lista');
      } else {
          app.set('layout', './layouts/default/edit');
          res.render('layouts/default/edit', { edit: medication });
      }
  }).catch((err) => {
      res.send("Este medicamento não existe! " + err);
  });
}

function editSendMedicamento(req, res) {
  const medicationId = req.body.id;
  Medicamento.findByPk(medicationId)
      .then((medication) => {
          if (!medication) {
              res.redirect('/lista');
          } else {
              medication.nome = req.body.nome;
              medication.descricao = req.body.descricao;
              medication.indicacao = req.body.indicacao;
              medication.modoUso = req.body.modoUso;
              medication.efeitosColaterais = req.body.efeitosColaterais;

              medication
                  .save()
                  .then(() => {
                      res.redirect('/lista');
                  })
                  .catch((err) => {
                      console.error(err);
                      res.send('Erro ao atualizar: ' + err);
                  });
          }
      })
      .catch((err) => {
          console.error(err);
          res.send('Erro ao buscar medicamento: ' + err);
      });
}

function deleteMedicamento(req,res){
  Medicamento.destroy({where: {'id': req.params.id}}).then(function(){
      res.redirect('/lista');
  }).catch(function(err){
      res.send("Este medicamento não existe! "+ err);
  });
}

module.exports = { getMedicamentos, sendMedicamento, listarMedicamento, editarMedicamento, editSendMedicamento, deleteMedicamento };
