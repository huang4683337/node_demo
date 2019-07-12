// 引入 mongoose
const mongoose = require('mongoose');

// 引入 Schema 用于设计表结构
const Schema = mongoose.Schema;


// 1- 链接数据库 test， test不存在时当我们添加第一条数据时会自动创建
mongoose.connect('mongodb://localhost:27017/test');


// 2- 设计集合结构（表结构）
// 添加约束required 是为了保证数据的完整性，避免产生脏数据
let userSchema = new Schema({
    userName: String, // 字段为：userName  类型为：string  未添加约束
    name: {  // 字段为：name  类型为：String  默认值为：名字
        type: String,
        default: '名字',
        required: true, // 必填
    },
    password: {
        type: Number,
        default: 11111,
        required: true, // 必填
    }
})



// 3- 将文档结构发布为模型
/*
mongoose.model 将一个架构发布为模型

参数1: 大写的、代表单数的字符串来表示数据库名称 ==> User; mongoose会自动将其转换成小写的、表示复数的字符串 ==> users

参数2: 自己定义的架构 blogSchema
*/

const User = mongoose.model('User', userSchema);


//4- 可以开始操作数据库了

const admin = new User({
    userName: 'admin',
    name: '管理人员',
    password: 123456
})

admin.save((err, ret) => {
    if (err) {
        console.log(err);
    } else {
        console.log(ret);
    }
})