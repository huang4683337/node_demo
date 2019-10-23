var http = require('http'); // 建立 node 服务使用

var fs = require('fs'); // node 中读取文件的模块

var template = require('art-template'); // art-template 模板
//template的使用方式template.render('模板字符串', {'替换模版字符串'});


// 建立服务
var server = http.createServer();


server.on('request', (req, res) => {
    fs.readFile('./index.html', (err, data) => {  // 读取 index.html 模板 将数据渲染
        
        if (err) {
            return console.log('读取失败')
        }
        tplStr = data.toString();
        var ret = template.render(tplStr, {
            name: '哈哈哈',
            age: '18',
            arr: ['sda', 'aaaaaa', 'dddddd']
        });

        // 服务响应结束
        res.end(ret);
    })
})

server.listen('3000', '127.0.0.1', () => {
    console.log('http://localhost:3000/')
})
