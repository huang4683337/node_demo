// nodeJS 核心模块 用来读取文件
var fs = require('fs');


//读取文件
fs.readFile('./read.txt', 'utf-8', function(err, data){
    if(data){
        // 因为结果是二进制 所以需要转换
        console.log('读取到的数据：', data.toString());
    }else if(err){
        console.log('错误信息：',err);
    }
})



// 写入文件

fs.writeFile('./writ.txt', '我开始写入文件了', function(err){
    if(!err){
        console.log('文件写入成功');
    }else{
        console.log('错误信息：',err)
    }
})
