// 引入 epress
const express = require('express');
const server = express();


// 在 express 中使用 art-template, .html 后缀的文件使用 art-template 模板解析  默认 html 在 viws 文件夹中
server.engine('html', require('express-art-template'));


// 使用 body-parser 中间件 可以用 res.body 获取到 post 请求数据
var bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())


// 引入 router 文件 并且使用
const router = require('./router');
server.use(router)


// 监听端口
server.listen(3000, ()=>{
    console.log("http://localhost:3000")
} )