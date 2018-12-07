var express = require('express');
var router = express.Router();

// var User = require('../model/testdb');

var User = require('../model/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('Admin/register.html') ;
});


router.post('/', function(req, res) {

    var userName = req.body.username;
    var passWord = req.body.password;

    var postData = {
      username:userName,
      password:passWord,
      status:"0"
    };

    User.findOne({username:postData.username},function (err, data) {
        console.log(userName);
        console.log(passWord);
       if(data){
           res.send("该用户已注册");
       } else {
           User.create(postData,function (err, data) {
               if (err) throw err;
               res.send("注册成功");

           })
       }
    });


});


module.exports = router;