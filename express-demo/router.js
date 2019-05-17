const express = require('express');

var  data = [{ name: '迷你', cont:'我是阿道夫'}];

// 创建一个路由容器
var router = express.Router();



// 路由挂在到容器中
router.get('/', (req, res)=>{
    res.render('index.html',{
        dataList:data
    })
})
 
router.get('/post', (req, res)=>{
    res.render('post.html');
})


router.post('/add', (req, res)=>{
    data.unshift(req.body);
    res.redirect('/')
})


module.exports = router;