var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {

    res.render('Admin/Artical/add.html');

});


module.exports = router;