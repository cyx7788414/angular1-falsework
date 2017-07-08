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
    <script type="text/javascript">
        ${require('src/main/js/browsercheck.js')}
    </script>
    <style type="text/css">
        ${require('src/main/css/init.css')}
    </style>
</head>
<body ng-app="mainModule">
    <div class="main_view" ui-view></div>
</body>
</html>
`;