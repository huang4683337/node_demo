/*
node中有一个 module对象， module 对象中有一个 exports 对象， 在坐后面有个 return module.exports
let module = {
    exports:{

    }
}
return module.exports
*/ 

//导出单个
/* 
导出： 可以 module.exports = function(){},
引入： var inExports = require('路径');
使用： inExports();
*/

//导出多个
/* 
导出： 可以 module.exports = { 'delete':delete, 'add':add, ... },
引入： var inExports = require('路径');
使用： inExports.delete(); inExports.add();
*/

/* 
node 定义了一个变量 exports = module.exports;
*/


