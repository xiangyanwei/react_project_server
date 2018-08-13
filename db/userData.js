const mongoose = require ('mongoose') ;
const md5 = require('blueimp-md5') ;
mongoose.connect('mongodb://localhost:27017/employ') ;
const con = mongoose.connection ;
con.on('connected', function(){
    console.log('数据库连接成功');
})

const UserSchema = mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        type: {type: String, required: true},
        header: {type: String}, // 头像名称
        post: {type: String}, // 职位
        info: {type: String}, // 个人或职位简介
        company: {type: String}, // 公司名称
        salary: {type: String}
    }
)
const UserModel = mongoose.model("userData", UserSchema ) ;

exports.UserModel = UserModel ;