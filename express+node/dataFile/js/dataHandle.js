
/* 
数据操作文件模块
实现文件的读取和修改
*/

const fs = require('fs');

const dbPath = './dataFile/json/db.json';  // 数据存储文件


/* 获取所有数据信息 */
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, JSON.parse(data)); //数据转为json格式的
    })
}



/* 添加数据 */
exports.add = function (dataOne, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {

        if (err) {
            return callback(err, null);
        }
        var data = JSON.parse(data).data;  // 读取到的数据 数组

        dataOne.id = data.length;  // 新增数据ID

        data.unshift(dataOne); // 新的数据添加到 data.json 读取到的数据中

        var dataStr = JSON.stringify({  // 数据转为字符串后写入到文件中
            data: data
        })
        fs.writeFile(dbPath, dataStr, (err) => {
            if (err) {
                callback(err, null);
            }
            callback(); // 成功
        });
    });
}



/* 修改数据 */
exports.updateById = function (infoData, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        data = JSON.parse(data); //将取出来的数据转为JSON
        let dataList= data.data;


        for(let key in dataList){
            if(dataList[key].id === parseInt(infoData.id)){
                dataList[key].name = infoData.name;
                dataList[key].cont = infoData.cont;
            }
        }
        data = JSON.stringify(data); // 将数据转为 string 用于文件存储
        fs.writeFile(dbPath, data, (err)=>{
            if(err){
                return callback(err);
            }
            callback(null);
        })
    })
}



/* 根据ID获取对应数据 */
exports.getID = function(id, callback){
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        data = JSON.parse(data);
        let dataList = data.data;
        var itemData = dataList.find((item)=>{
            return item.id === id;
        })

        callback(itemData)
        
    })
}



// 获取id对应的索引
exports.getIndex = function(id, callback){
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        data = JSON.parse(data);
        let dataList = data.data;
        var index = dataList.findIndex((value,index)=>{
            return value.id === id;
        })
        callback(index)
        
    })
}



//删除
exports.deleteIndex = function(index, callback){
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        data = JSON.parse(data);
        let handleData = data.data;
        handleData.splice(index, 1);

        let dataStr = JSON.stringify(data);
        fs.writeFile(dbPath,dataStr,(err)=>{
            if(err){
                return callback(err);
            }
            callback(null, data);
        })
    })
}