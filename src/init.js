import 'es6-promise/auto';

import 'bootstrap-loader';

import angular from 'angular';
import uiRoute from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';

var app = angular.module('mainModule', ['ui.router', uiBootstrap]);

//window._globalControllerLoadedFlagSet = {};//全局变量保存已加载的contrllerName，用于确保在resolve模版时controller已注入
// app.custom = {};
// app.custom.registController = function(name) {
//     //window._globalControllerLoadedFlagSet[name] = true;
// };
window.controllerLoadChecker = function() {//全局保存已加载的contrllerName，用于确保在resolve模版时controller已注入
    var controllerList = {};
    var checkList = [];
    var checkTimeout = '';

    var check = function() {//检查
        for (var x = checkList.length - 1; x >= 0; x--) {
            if (controllerList[checkList[x].name]) {
                checkList[x].callback();
                checkList.splice(x, 1);
            }
        }
        if (checkList.length === 0) {//没有则停止定时循环
            checkTimeout = '';
            return '';
        } else {
            return window.setTimeout(function() {
                checkTimeout = check();
            }, 1);
        }
    };

    return {
        regist: function(name) {//注册controller
            controllerList[name] = true;
        },
        setCheck: function(name, callback) {//插入要检查的controller与resolve回调
            checkList.unshift({
                name: name,
                callback: callback
            });
            if (!checkTimeout) {
                checkTimeout = check();
            }
        }
    };
}();


app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', //异步加载controller等
    function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.register = {
            //controller: $controllerProvider.register,
            controller: function() {
                $controllerProvider.register.apply($controllerProvider, arguments);//调用原函数
                //window._globalControllerLoadedFlagSet[arguments[0]] = true;//注入controller的name
                window.controllerLoadChecker.regist(arguments[0]);//注入controller的name
            },
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
    }
]);

app.config(['$stateProvider', '$urlRouterProvider', //ui-route的导航设置
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/fore');//默认转到 

        // $stateProvider.decorator('views', function(state, getViews) {//动态加载
        //     var views = getViews(state);
        //     angular.forEach(views, function(viewItem, viewName) {
        //         console.log(123);
        //         //viewItem.template = viewItem.template?viewItem.template:import('src/' + viewItem.$context.self.basePath + '.html');
        //     });
        //     return views;
        // });

        $stateProvider
        .state('index', {//基础state，其余在各模块定义
            url: '/', 
            resolve: {
                load: ['$q', function($q) {
                    var defer = $q.defer();
                    require(['src/main/views/main.html', 'src/main/views/mainController.js', 'src/main/css/main.scss'], function(template) {
                        defer.resolve({
                            template: template
                        });
                    });
                    return defer.promise;
                }]
            },
            basePath: 'main/views/main',
            templateProvider: ['load', function(load) {
                return load.template;
            }]
        });

        var routeRegister = require('src/main/js/routeRegister.js');//引用各处定义的state
        routeRegister($stateProvider);

    }
]);

export {app};


