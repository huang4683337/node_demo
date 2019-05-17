var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request', (req, res) => {
    hanleReqPath(req, res);
})

// 路由
function hanleReqPath(req, res) {
    var path = req.url;  // 拿到的路径是 端口号后面的
    switch (path) {
        case '/':
            fsRead('./read.txt', res);
            res.setHeader('Content-Type', 'text/palin; charset=utf-8');
            break;
        case '/html':
            fsRead('./file/index.html', res);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            break;
        case '/girl':
            fsRead('./file/photo.jpeg', res);
            break;
        case '/favicon.ico':
            res.end('览器的默认请求 网站头部小图标');
            break;
        default:
            res.end('404')
    }

}

// 文件读取
function fsRead(url, res){
    return fs.readFile(url,(err, data)=>{
        if(err){
            return res.end('文件读取失败');
        }
        res.end(data); //结束响应 并发送响应数据 
    })
}

server.listen('3000', '127.0.0.1', () => {
    console.log('http://localhost:3000/')
})

