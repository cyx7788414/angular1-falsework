define(function() {

    var registList = [//在此注册路径名
        'main/conf/main',
        'test'
    ];

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

    var getTemplateProvider = function() { //返回延迟加载template函数
        var templateProvider = ['load', function(load) {
            return load.template;
        }];
        return templateProvider;
    };

    var register = function($stateProvider) { //遍历加载注册各router
        for (var x = 0; x < registList.length; x++) {
            var states = require('src/' + registList[x] + 'Register.js');
            for (var y = 0; y < states.length; y++) {
                var temp = states[y];
                temp.resolve = {
                    load: getLoad(states[y], $stateProvider)
                };
                temp.templateProvider = getTemplateProvider();
                $stateProvider.state(temp.name, temp);
            }
        }
    };

    return register;
});