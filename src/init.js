import 'es6-promise/auto';

import 'bootstrap-loader';

import angular from 'angular';
import uiRoute from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';

var app = angular.module('mainModule', ['ui.router', uiBootstrap]);

app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', //异步加载controller等
    function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.register = {
            controller: $controllerProvider.register,
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


