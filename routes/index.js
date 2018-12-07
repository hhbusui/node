var express = require('express');
var router = express.Router();

var users = require("./users")
// 注册
var reg = require("./reg");
// 登录
var login = require('./login');


// 文章管理
var articalIndex = require('./Admin/Artical/index');
var articalList = require('./Admin/Artical/list');
var articalAdd = require('./Admin/Artical/add');


// 图片上传
var imgUpload = require('./Upload/layeditUpload');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("aaa     :"+req.session.username);

    // if(req.session != null ||req.session ){
    //
    // }
    // res.send("ok");

    res.render('Admin/index', { username: "aaa" });
});



router.use('/users', users);
router.use('/reg', reg);
router.use('/login',login);

router.use('/Admin/Artical/Index', articalIndex);

router.use('/Admin/Artical/', articalIndex);
router.use('/Admin/Artical/List', articalList);
router.use('/Admin/Artical/Add', articalAdd);

router.use('/Admin/Artical/Detail', articalAdd);


// 图片上传
router.use('/Layedit/Upload/*', imgUpload);


module.exports = router;
