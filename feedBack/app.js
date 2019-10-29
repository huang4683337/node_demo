const http = require('http');
const fs = require('fs');
const url = require('url');  //将url地址格式化

const template = require('./node_modules/art-template');
const comments = require('./static/mes.json');

const server = http.createServer();

server.on('request', (req, res)=>{
    
    //地址对象
    let obj = url.parse(req.url, true);  //true 是将 ？ 后面的参数拆分成 json 形式
    let pathname = obj.pathname; //代表端口后面 不报错地址参数的部分地址
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    if(pathname == '/'){

        fs.readFile('./view/index.html', (err, data)=>{
            
            if(err){
                return res.end('服务器开小差了', err);
            }

            data = data.toString();

            let htmlStr = template.render(data,{
                comments:comments
            })
            
            res.end(htmlStr);
        });

    }else if(pathname === '/post'){
        
        fs.readFile('./view/post.html', (err, data)=>{

            if(err){
                return res.end('服务器开小差了', err);
            }

            res.end(data);
        })

    }else if(pathname === '/pinglun'){ //接受 表单 get 提交的数据

        let dataSub = obj.query;
        dataSub.dateTime = Number( new Date() );
        dataSub = JSON.stringify(obj.query);

        let writeData = comments;
        writeData.unshift(obj.query)


        fs.writeFile('./static/mes.json', JSON.stringify(writeData), err=>{

            if(err){
                return res.end('写入失败');
            }
            
            res.statusCode = 302;   //临时重定向
            res.setHeader('Location', '/'); /* 
            解决form表单提交跳转到 '/pinglun'地址后，重定向到首页 '/', 因为我们在上边定义 pathname == '/'时 打开的是index.html首页
            */
            res.end(dataSub)
        })

    }else if( pathname.indexOf('/static/') === 0 ){

        // 处理外链引入静态资源的请求 通过 script、link 等标签引入,整个 static 都允许被访问
        fs.readFile(`.${pathname}`, (err, data)=>{

            if(err){
                return res.end( err.toString() );
            }

            res.end(data);
        })
    
    }else{
        fs.readFile(`./view/404.html`, (err, data)=>{

            if(err){
                return res.end('404也丢了恶');
            }

            res.end(data);
        })

    }
})

server.listen('3000','127.0.0.1',()=>{
    console.log('http://localhost:3000/')
})


//静态资源的解析
/* 
浏览器收到 HTML 响应内容之后, 从上到下依次解析;

在解析过程中, 碰到 link、script、img、iframe、video、audio 等带有 scr 或者 href 的标签时（带有外链资源），
        浏览器会自动对这些资源发起请求。      
*/


// 路由的处理 -- url 核心模块
/* 
./xxx: 代表文件路径
/xxx：代表 url 路径， / 代表根的意思；  /xxx 相当于 http://localhost:3000/xxx

       地址        资源文件
         /           index.html
          /post       post.html
        /static     静态资源  

*/


//服务端的渲染
/* 
通过 form 表单提交数据
通过 url 核心模块 处理 get 请求的地址传参
通过 fs 模块 将数据存入 json 文件中
form表单提交成功后 进行重定向
*/
/* 
服务器通过客户端重定向
    1、状态码设为302 临时重定向 -- statusCode

    2、在响应头中通过 location 告诉客户往哪儿重定向 -- setHeader
*/