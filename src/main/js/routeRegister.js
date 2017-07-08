define(function() {

    var registList = require('src/main/conf/statefileRegister.js');

    var getLoad = function(state, $stateProvider) { //返回延迟加载函数
        var load = ['$q', function($q) {
            var defer = $q.defer();
            $q.all([import('src/' + state.basePath + '.html'), import('src/' + state.basePath + 'Controller.js')]).then(function(resource) {// jshint ignore:line
                defer.resolve({
                    template: resource[0]
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
        if (belongToStates) {
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