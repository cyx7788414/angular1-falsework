define(function() {
    //思路来自oclazyload，copy部分内部属性操作代码并裁剪修改
    var regModules = [],
        providers = {},
        app,
        instanceInjector,
        regConfigs = [],
        regInvokes = {},
        $initRootElement;

    var hashCode = function hashCode(str) {
        var hash = 0,
            i,
            chr,
            len;
        if (str.length === 0) {
            return hash;
        }
        for (i = 0, len = str.length; i < len; i++) {
            chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    var _registerInvokeList = function(args, moduleName) {
        var invokeList = args[2][0],
            type = args[1],
            newInvoke = false;
        if (angular.isUndefined(regInvokes[moduleName])) {
            regInvokes[moduleName] = {};
        }
        if (angular.isUndefined(regInvokes[moduleName][type])) {
            regInvokes[moduleName][type] = {};
        }
        var onInvoke = function(invokeName, invoke) {
            if (!regInvokes[moduleName][type].hasOwnProperty(invokeName)) {
                regInvokes[moduleName][type][invokeName] = [];
            }
            if (checkHashes(invoke, regInvokes[moduleName][type][invokeName])) {
                newInvoke = true;
                regInvokes[moduleName][type][invokeName].push(invoke);
            }
        };

        var checkHashes = function(potentialNew, invokes) {
            var isNew = true,
                newHash;
            if (invokes.length) {
                newHash = signature(potentialNew);
                angular.forEach(invokes, function (invoke) {
                    isNew = isNew && signature(invoke) !== newHash;
                });
            }
            return isNew;
        };

        var signature = function(data) {
            if (angular.isArray(data)) {
                // arrays are objects, we need to test for it first
                return hashCode(data.toString());
            } else if (angular.isObject(data)) {
                // constants & values for example
                return hashCode(stringify(data));
            } else {
                if (angular.isDefined(data) && data !== null) {
                    return hashCode(data.toString());
                } else {
                    // null & undefined constants
                    return data;
                }
            }
        };

        if (angular.isString(invokeList)) {
            onInvoke(invokeList, args[2][1]);
        } else if (angular.isObject(invokeList)) {
            angular.forEach(invokeList, function (invoke, key) {
                if (angular.isString(invoke)) {
                    // decorators for example
                    onInvoke(invoke, invokeList[1]);
                } else {
                    // components registered as object lists {"componentName": function() {}}
                    onInvoke(key, invoke);
                }
            });
        } else {
            return false;
        }
        return newInvoke;
    };

    var _invokeQueue = function(providers, queue, moduleName) {
        if (!queue) {
            return;
        }

        var callInvoke = function(fct, args) {
            var invoked = regConfigs.indexOf(moduleName + '-' + fct);
            if (invoked === -1) {
                if (invoked === -1) {
                    regConfigs.push(moduleName + '-' + fct);
                }
                if (angular.isDefined(provider)) {
                    provider[args[1]].apply(provider, args[2]);
                }
            }
        };

        var i, len, args, provider;
        for (i = 0, len = queue.length; i < len; i++) {
            args = queue[i];
            if (angular.isArray(args)) {
                if (providers !== null) {
                    if (providers.hasOwnProperty(args[0])) {
                        provider = providers[args[0]];
                    } else {
                        throw new Error('unsupported provider ' + args[0]);
                    }
                }
                var isNew = _registerInvokeList(args, moduleName);
                if (args[1] !== 'invoke') {
                    if (isNew && angular.isDefined(provider)) {
                        provider[args[1]].apply(provider, args[2]);
                    }
                } else {
                    // config block
                    if (angular.isFunction(args[2][0])) {
                        callInvoke(args[2][0], args);
                    } else if (angular.isArray(args[2][0])) {
                        for (var j = 0, jlen = args[2][0].length; j < jlen; j++) {
                            if (angular.isFunction(args[2][0][j])) {
                                callInvoke(args[2][0][j], args);
                            }
                        }
                    }
                }
            }
        }
    };

    var register = function(moduleName) {
        var moduleFn;
        try {
            moduleFn = angular.module(moduleName);
        } catch (e) {
            console.log(e);
            return;
        }
        if (regModules.indexOf(moduleName) === -1) {
            if (moduleFn.requires) {
                inject(moduleFn.requires);
            }
            regModules.push(moduleName);
            var runBlocks = [];
            if (moduleFn._runBlocks.length > 0) {
                while (moduleFn._runBlocks.length > 0) {
                    runBlocks.push(moduleFn._runBlocks.shift());
                }
            }
            _invokeQueue(providers, moduleFn._invokeQueue, moduleName);
            _invokeQueue(providers, moduleFn._configBlocks, moduleName); // angular 1.3+
            instanceInjector = providers.getInstanceInjector();
            angular.forEach(runBlocks, function (fn) {
                instanceInjector.invoke(fn);
            });
        }
    };

    var inject = function(moduleArray) {//参数只接受模块名字符串数组
        if (!$.isArray(moduleArray) || moduleArray.length === 0) {
            console.log('Invalid param');
            return;
        }
        for (var x = 0; x < moduleArray.length; x++) {
            register(moduleArray[x]);
        }
    };

    var init = function(mainModule, $controllerProvider, $compileProvider, $filterProvider, $provide, $injector, $animateProvider) {
        app = mainModule;
        providers = {
            $controllerProvider: $controllerProvider,
            $compileProvider: $compileProvider,
            $filterProvider: $filterProvider,
            $provide: $provide, // other things (constant, decorator, provider, factory, service)
            $injector: $injector,
            $animateProvider: $animateProvider,
            getInstanceInjector: function() {
                return instanceInjector ? instanceInjector : instanceInjector = $rootElement.data('$injector') || angular.injector();
            }
        };
        app.lazyModuleInject = inject;
    };

    var initRootElement = function(rootElement) {
        $rootElement = rootElement;
    };

    return {
        init: init,
        initRootElement: initRootElement
    };
});