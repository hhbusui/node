var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var UPLOAD_PATH = '/Upload/';

router.get('/', function (req, res) {

    console.log(JSON.stringify(req));
    console.log("")
    // var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    // res.send(form);
});

router.post('/', function (req, res) {

    // 插件上传表单
    var newPath,
        form = new formidable.IncomingForm();
    // var form.encoding = 'utf-8',
    //     form.uploadDir = 'public' + UPLOAD_PATH,
    //     form.keepExtensions = true,
    //     form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小;

    form.parse(req, function (err, fields, files) {

        if(err){
            var json =  {
                "code": 1
                ,"msg": "哇，似乎失败了耶！"
            };
            res.json(json);
            return;
        }

        // 后缀名
        var extName = "";
        switch (files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
            case  'image/gif':
                extName = 'gif';
                break;
        }

        if(extName.length == 0){
            var json =  {
                "code": 1
                ,"msg": "只支持png/jpg/gif格式图片！"
            };
            res.json(json);
            return;
        }else {
            var d=new Date()
            var day=d.getDate()
            var month=d.getMonth() + 1
            var year=d.getFullYear()

            var imgUrlName = year + "-" + month + "-" + day + "";
            var avatarName = Math.random().toString().substring(2) + '.' + extName;
            var uploadDir = './public/upload/' + imgUrlName + '/';
            newPath = uploadDir + avatarName;

            var is = fs.createReadStream(files.file.path);
            var os = fs.createWriteStream(newPath);
            is.pipe(os);
            is.on('end',function(){
               fs.unlinkSync(files.file.path);
            });




            var json =  {
                "code": 0
                ,"msg": "幸运值爆发，终于成功啦！"
                ,"data": {
                    "title":"表情包",
                    "src": "./../../public/upload/" + newPath
                }
            };

            res.json(json);
            return;
        }


    });



});


module.exports = router;