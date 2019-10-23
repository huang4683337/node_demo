// 整体路由配置

// 引入express
const express = require('express');

// 引入数据库模型
const User = require('./../models/user.js');

// 创建一个路由容器
var router = express.Router();

// 渲染首页
router.get('/', (req, res) => {
  res.render('index.html');
})

//渲染注册页面
router.get('/register', (req, res) => {
  res.render('../views/register.html');
})

// 处理注册请求
router.post('/register', async (req, res) => {
  // 1- 获取表单提交数据
  var body = req.body;
  // 2- 查询邮箱是否存在
  try{
    if( await User.findOne({email:body.email}) ){
      return res.status(200).json({err:'邮箱存在'});
    }
    if( await User.findOne({nickname:body.nickname}) ){
      return res.status(200).json({err:'昵称存在'});
    }
    await new User(body).save();
    res.status(200).json({success:'注册成功'});
  }catch(err){
    res.status(500).json({err:err.message});
  }

})

//渲染登陆页面
router.get('/login', (req, res) => {
  res.render('../views/login.html');
})

// 处理登陆请求
router.post('/login', (req, res) => {
  res.render('index.html');
})

// 处理退出请求
router.get('/logout', (req, res) => {
  res.render('index.html');
})

// 导出 router
module.exports = router;