var express = require('express');
var router = express.Router();

var json = require('../artical.json');

router.get('/', function (req, res, next) {

    var response = JSON.stringify(json);

    res.render('Admin/Artical/index.html');

});


module.exports = router;