// 引入 mongoose
const mongoose = require('mongoose');

// 引入 Schema 用于设计表结构
const Schema = mongoose.Schema;

// 1- 链接数据库 test， test不存在时当我们添加第一条数据时会自动创建
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

// 2- 设计集合结构（表结构）
let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: { //昵称
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    create_time: { //创建时间
        type: Date,
        default: Date.now(), // 可以获取到当前时间的时间戳
    },
    last_modified_time: {  // 最后修改时间
        type: Date,
        default: Date.now(),
    },
    avatar: { //头像
        type: String,
        default: '../public/img/defaylt_avatar.jpg',
    },
    bio: { //简介
        type: String,
        default: '',
    },
    sex: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1,
    },
    birthday: {
        type: Date,
    },
    status: { // 账户状态
        /** 
         0: 无权限限制，
         1: 不可评论，
         2: 不可登陆
        */
        type: Number,
        enum: [1, 2],
        default: 0,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;