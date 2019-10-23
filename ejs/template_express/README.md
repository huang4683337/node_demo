**有关template的地址索引**

[template 直接用于 html文件](https://github.com/huang4683337/nodeJs/tree/master/ejs/template_html)

[template 在 node 中的使用](https://github.com/huang4683337/nodeJs/tree/master/ejs/template_node)

[template 模板继承](https://github.com/huang4683337/nodeJs/tree/master/ejs/template_express)



# art-template 


> 如何实现头部、底部公共部分的处理

> 自行查看 [模板继承](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF)

> 可以继承 \<style>\</style> 、\<div>\</div>、\<script>\</script>



#### 继承

> header.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>头部</title>
</head>
<body>
    
    我是头部

</body>
</html>
```



> Index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>首页</title>
</head>

<body>

    {{ include './header.html'}}  <!-- 将 header.html 放入 index.html中 -->
    <h1>{{name}}</h1>

</body>

</html>
```



#### 写一个插槽，用于插入不断变化的部分

> Layout.html

```html
<!-- 写一个插槽，用于插入不断变化的部分 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>内容部分的插槽</title>
</head>
<body>

        {{ include './header.html'}}

        <!-- 插槽 -->
        {{ block 'content'}}
        <h1>我是默认的，如果不传过来自定义的内容就用我</h1>
        {{ /block}}

        {{ include './footer.html'}}
    
</body>
</html>
```



> 修改 index.html 中的内容 利用 extend 去继承 layout的

```html
<!-- 去继承layout定义的 -->
{{ extend './layout.html' }}

<!-- 我要填写自己的坑 -->
{{ block 'content' }}

<div>
    <h1>我是index.html页面，我要填写自己的坑</h1>
</div>

{{ /block }}
```



#### 继承 js脚本和静态的

```htm
{{ block 'css'}}  {{ /block}}

{{ block 'scripts'}}
	<script src=""></script>  <!-- 默认给个空的插槽 -->
{{ /block}}
```

> 填坑

```html
{{ block 'css' }}
	<link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
{{ /block }}


{{ block 'scripts' }}
	<script src="/node_modules/jquery/dist/jquery.js"></script>
  <script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
{{ /block }}
```

