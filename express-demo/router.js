const express = require('express');


// 创建一个路由容器
var router = express.Router();

var dataHandle = require('./dataHandle');

// 数据列表
router.get('/', (req, res)=>{

    dataHandle.find((err, data)=>{
       
        if(err){
            return res.status(500).send('Server error')
        }
        res.render('index.html',{
            dataList: data.data
        })

    })

})

// 发表页面
router.get('/post', (req, res)=>{
    res.render('post.html');
})

// 添加信息
router.post('/add', (req, res)=>{
    dataHandle.add(req.body, (err, success)=>{
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/');
    })
})

// 删除信息

// 改变信息


module.exports = router;