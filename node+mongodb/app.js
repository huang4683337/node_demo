// 引入 express
const express = require('express');
const path = require('path');

// 创建服务
const server = express();

// 引入中间件
const bodyParser = require('body-parser');

// 配置中间件
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

// 引入路由文件
const router = require('./routes/routes');

// 将导出的 router 挂载到服务中
server.use(router);

// 开放静态资源
server.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));

// 配置匹配 .html结尾的
server.engine('html', require('express-art-template'));

//  res.render('模板文件名字', {模板数据});  art-template会默认去项目的views目录中查找
server.get('/', (req, res)=>{
    res.render('index.html',{
      name:'我是名字'
    });
})

// 监听端口
server.listen(3000, ()=>{
    console.log("http://localhost:3000")
} )