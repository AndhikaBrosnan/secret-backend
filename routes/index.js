var express = require('express');
var router = express.Router();
const Coba = require('../models/Coba')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/coba', function(req, res, next) {
  const coba = new Coba ({
    coba: 'coba',
  })
  coba.save(function (error, document) {
    if (error) console.error(error)
    console.log(document)
  })
  res.send('respond with a resource');
});

module.exports = router;
