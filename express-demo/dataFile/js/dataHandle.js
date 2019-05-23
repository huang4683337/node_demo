
/* 
数据操作文件模块
实现文件的读取和修改
*/
const fs = require('fs');

const dbPath = './dataFile/json/db.json';


/* 获取所有数据信息 */
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', (err, data)=>{
        if (err) {
            return callback(err, null);
        }
        callback(null, JSON.parse(data)); //数据转为json格式的
    })
}

// /* 添加数据 */
exports.add = function(dataOne, callback){
    fs.readFile(dbPath, 'utf8', (err, data)=>{

        if(err){
            return callback(err, null);
        }
        var data = JSON.parse(data).data;  // 读取到的数据 数组

        dataOne.id = data.length;  // 新增数据ID

        data.unshift(dataOne); // 新的数据添加到 data.json 读取到的数据中

        var dataStr = JSON.stringify({  // 数据转为字符串后写入到文件中
            data: data
        }) 
        fs.writeFile(dbPath, dataStr, (err)=>{
            if(err){
                callback(err, null);
            }
            callback(); // 成功
        });
    });
}

// /* 删除数据 */
// exports.delete = function(){

// }

// /* 修改数据 */
// exports.change = function(){

// }

// /* 获取某条数据 */
// exports.byId = function(){

// }