var mongoose = require('mongoose');
var config = require('./db_url');



module.exports = function () {
    // 连接数据库
    var db = mongoose.connect(config.mongodb);

    // 成功
    mongoose.connection.on("open", function () {
        console.log("数据库连接成功");
    });

    // 失败
    mongoose.connection.on("error", function (error) {
        console.log("数据库连接失败" + error);
    });

    return db;

}



