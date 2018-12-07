var  mongoose = require('mongoose');
var DB = mongoose.connect('mongodb://localhost:27017/blog');//红色为数据库名

//
mongoose.connection.on("open", function () {
        console.log("数据库连接成功");
});

//
mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败" + error);
});

var usersSchema = new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    status:{type:String}
});

module.exports = mongoose.model('users', usersSchema);
