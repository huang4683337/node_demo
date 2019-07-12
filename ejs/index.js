var http = require('http');
var fs = require('fs');
var template = require('art-template');

var server = http.createServer();

var wwwDir = './a/';			// 所有读取文件所在的根目录

server.on('request', (req, res) => {
    var url = req.url;  				// 端口后面的路径
    var filePath = 'index.html';		// 路径为 / 时 文件路径指向index.html




    if (url !== '/') {
        filePath = url;

        
        fs.readFile(`${wwwDir}${filePath}`, (err, data) => {
            if (err) {
                return res.end('404');
            }

            fs.readdir(wwwDir, (err, files) => {
                if (err) {
                    return res.end('404');
                }
                data = data.toString();
                var htmlStr = template.render(data, {
                    files: files
                })

                res.end(htmlStr);
            })
        })
    }else{
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                return console.log('读取失败')
            }
            tplStr = data.toString();
            var ret = template.render(tplStr, {
                name: '魔神',
                age: '18',
                arr: ['sda', 'aaaaaa', 'dddddd']
            });
            res.end(ret);
            // console.log(ret);
        })
    }
})

server.listen('3000', '127.0.0.1', () => {
    console.log('http://localhost:3000/')
})
