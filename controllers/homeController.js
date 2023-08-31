function getView(req, res) { 
    res.render('layouts/default/home', {  pageTitle: 'Home'});
}

function btnEntrar(req, res) { 
    res.redirect('/medicamentos'); 
}

module.exports = { getView, btnEntrar };