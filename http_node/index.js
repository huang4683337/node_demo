var http  = require('http');



var server = http.createServer();

//接收到客户端的请求时 响应
server.on('request', (req, res)=>{
    res.setHeader('Content-Type', 'text/palin; charset=utf-8');
    hanleReqPath(req, res);
})

// res.end('参数'); 参数只能是字符串 或者 二进制


// 路由配置
function hanleReqPath(req, res){
    path = req.url;  // 拿到的路径是 端口哈后面的
    switch(path){
        case '/':
            res.end('我是 /'); //结束响应 并发送响应数据 
            break;
        case '/a':
            res.end('我是 /a'); 
            break;
        case '/favicon.ico':
            res.end('览器的默认请求 网站头部小图标'); 
            break;
        default:
            res.end('404')
    }

}

server.listen('3000','127.0.0.1',()=>{
    console.log('http://localhost:3000/')
})