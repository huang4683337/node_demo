const express = require('express');


// 创建一个路由容器
var router = express.Router();

var dataHandle = require('./dataFile/js/dataHandle');

// 数据列表
router.get('/', (req, res) => {
    dataHandle.find((err, data) => {  // find 方法是封装的获取所有信息的毁掉函数

        if (err) {
            console.log(err);
            return res.status(500).send('Server error')
        }
        res.render('index.html', {
            dataList: data.data
        })

    })

})

// 发表页面
router.get('/post', (req, res) => {
    res.render('post.html');
})

// 添加信息
router.post('/add', (req, res) => {
    console.log(req.body)
    dataHandle.add(req.body, (err, success) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error')
        }
        res.redirect('/');
    })
})

// 删除信息
router.post('/delete', (req, res) => {
    console.log(req.body);
    res.redirect('/');
    dataHandle.deleteData(req.body, (err, success) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }
        res.redirect('/');
    })
})

/**
  改变信息
*/
// 渲染编辑页面
router.get('/upDate', (req, res) => {

    let id = parseInt(req.query.id);
    // 获取id 对应的数据
    dataHandle.getID(id, (data) => {

        // 渲染到编辑修改页面
        res.render('upDate.html', {
            data: data
        })
    });

})

// 修改数据
router.post('/upDateList', (req, res)=>{
    req.body.id = parseInt(req.body.id);
    dataHandle.updateById(req.body,(err)=>{
        if(err){
            console.log(err);
            return res.status(500).send('Server error')
        }
        res.redirect('/');
    });
})




module.exports = router;