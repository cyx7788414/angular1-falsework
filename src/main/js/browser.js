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
<h1>珍爱生命，请使用现代浏览器,远离IE</h1>
<h2>推荐chrome或firefox</h2>
<a href="/">点击返回首页</a>
<div></div>
<img src="${require('../images/1.jpg')}"/>
</body>
</html>
`;