var template = require('art-template');

// template.render('模板字符串', {'替换模版字符串'}, options);


var tplStr;
var fs = require('fs');
fs.readFile('./ejs.html', (err, data)=>{
    if(err){
        return console.log('读取失败')
    }
    tplStr = data.toString();
    var ret = template.render(tplStr, {
        name: '魔神',
        age:'18',
        arr:['sda','aaaaaa','dddddd']
    });
    
    console.log(ret);
})