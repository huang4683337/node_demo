**有关template的地址索引**

[template 直接用于 html文件](https://github.com/huang4683337/nodeJs/tree/master/ejs/template_html)

[template 在 node 中的使用](https://github.com/huang4683337/nodeJs/tree/master/ejs/template_node)

[template 模板继承](https://github.com/huang4683337/nodeJs/tree/master/ejs/template_express)




# tenplate 直接在 html 中渲染

## 安装
```shell
$ npm install art-template --save
```

[Github-Demo](https://github.com/huang4683337/nodeJs/tree/master/ejs/template_html)

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>html渲染</title>
</head>
<body>
  	<!-- 渲染容器 -->
    <div id="cont"></div>
</body>
</html>


<!-- 引入 art-template-->
<script type="text/javascript" src="./node_modules/art-template/lib/template-web.js"></script>

<!-- 定义渲染模板 -->
<script type="text/template" id="tpl">
    <p>我的名字叫 {{ name }} </p>
</script>


<!-- 渲染逻辑 -->
<script>
    var htmlStr = template("tpl",{
        name:'名字',
    })
    console.log(htmlStr);

    document.getElementById('cont').innerHTML = htmlStr;

</script>
```

