var express = require('express');
var router = express.Router();

var User = require('../model/users');

router.get('/',function (req, res) {
    res.render('Admin/login.html');
});


// post
router.post('/',function (req, res) {
    var postData = {
        username:req.body.username,
        password:req.body.password,
    };

    User.findOne({
        username:postData.username,
        password:postData.password,
    },function (err,data) {
        if(err) throw err;
        if(data){
            // const session = req.session;

            // console.log(JSON.stringify(session))
            // var isSuper='超级管理员';
            // if(data.status==='0'){
            //     isSuper='普通用户';
            // }
            // req.session.username = postData.username;
            // res.render('../',{
            //     username:postData.username,
            //     isSuper:isSuper
            // });


            req.session.username = data.username;
            res.redirect('/');

        }else {
            res.send("账号或密码错误!")
        }
    })


});

module.exports = router