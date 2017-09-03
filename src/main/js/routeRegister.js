define(function() {

    var registList = require('src/main/conf/statefileRegister.js');

    var getLoad = function(state, $stateProvider) { //返回延迟加载函数
        var load = ['$q', '$stateParams', function($q, $stateParams) {
            var array = [];
            var basePath = '';
            var paramsUrl = '';
            if (state.variables && state.variables.length > 0) {//url带参数
                for (var x = 0; x < state.variables.length; x++) {
                    var tempSplitArray = $stateParams[state.variables[x]].split('-');//处理-分割的路径
                    //array.push($stateParams[state.variables[x]]);
                    array = array.concat(tempSplitArray);
                }
                paramsUrl = array.join('/');
            }
            basePath = state.basePath + paramsUrl;
            var controllerName = basePath.split('/').pop() + 'Controller';
            var defer = $q.defer();
            $q.all([import('src/' + basePath + '.html'), import('src/' + basePath + 'Controller.js')]).then(function(resource) {// jshint ignore:line
                // var checkControllerInterval = window.setInterval(function() {//检查是否加载完成Controller的依赖，用于确保在resolve模版时controller已注入
                //     if (window._globalControllerLoadedFlagSet[controllerName]) {
                //         window.clearInterval(checkControllerInterval);
                //         defer.resolve({
                //             template: resource[0]
                //         });
                //     }
                // }, 1);
                window.controllerLoadChecker.setCheck(controllerName, function() {//检查是否加载完成Controller的依赖，用于确保在resolve模版时controller已注入
                    defer.resolve({
                        template: resource[0]
                    });
                });
            }).catch(function(err) {
                console.log(err);
            });
            return defer.promise;
        }];
        return load;
    };

    var getTemplateProvider = function(name) { //返回延迟加载template函数
        var templateProvider = [name, function(load) {
            return load.template;
        }];
        return templateProvider;
    };

    var setLoadAndTemplateProvider = function($stateProvider, target, itemInfo, belongToStates) {//设置load和templateProvider
        target.templateProvider = getTemplateProvider(itemInfo.name);
        if (belongToStates) {//views的resolve要写在外面
            if (!belongToStates.resolve) {
                belongToStates.resolve = {};
            }
            belongToStates.resolve[itemInfo.name] = getLoad(itemInfo, $stateProvider);
        } else {
            target.resolve = {};
            target.resolve[itemInfo.name] = getLoad(itemInfo, $stateProvider);
        }
    };

    var register = function($stateProvider) { //遍历加载注册各router
        for (var x = 0; x < registList.length; x++) {
            var states = require('src/' + registList[x] + 'StateConf.js');
            for (var y = 0; y < states.length; y++) {
                var temp = states[y];
                if (temp.basePath) {
                    setLoadAndTemplateProvider($stateProvider, temp, states[y]);
                }
                if (temp.viewList && temp.viewList.length > 0) {//views
                    temp.views = {};
                    for (var z = 0; z < temp.viewList.length; z++) {
                        var viewItem = temp.viewList[z];
                        temp.views[viewItem.name] = {};
                        setLoadAndTemplateProvider($stateProvider, temp.views[viewItem.name], viewItem, states[y]);
                    }
                }
                $stateProvider.state(temp.name, temp);
            }
        }
    };

    return register;
});