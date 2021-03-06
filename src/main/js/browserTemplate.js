module.exports = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>angular1-falsework</title>
    <meta name="author" content="https://github.com/cyx7788414/angular1-falsework">
    <meta name="description" content="a falsework base on angular 1.6.4">
    <meta name="keywords" content="angular,webpack,www.kabiwo.com,卡比窝">
    <meta name="others" content="www.kabiwo.com">
    <style type="text/css">
        ${require('src/main/css/browser.css')}
    </style>
</head>
<body>
    <div class="container">
        <h1>珍爱生命，请使用现代浏览器，远离IE</h1>
        <h2>推荐chrome或firefox</h2>
        <div id="content" class="row-fluid">
            <p class="lead">
                自从我成为前端开发，IE就给我带来了无数烦恼。
            </p>
            <p>
                终于，我决定了，我的所有个人项目都将“去TM的IE”。
            </p>
            <p>
                净化环境，从我做起。
            </p>
            <p>
                项目地址：<a target="_blank" href="https://github.com/cyx7788414/angular1-falsework">https://github.com/cyx7788414/angular1-falsework</a>
            </p>
            <p>
                个人主页：<a target="_blank" href="http://www.kabiwo.com" title="http://www.kabiwo.com">卡比窝</a>
            </p>
            <p>
                作者：卡比<img src="${require('../images/1.jpg')}"/>
            </p>
        </div>
        <a class="btn btn-lg btn-success" href="/">点击返回首页</a>
    </div>
</body>
</html>
`;