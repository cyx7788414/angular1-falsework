webpackJsonp([2],{

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

Promise.all([
    // jshint ignore:start
    new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 66)),
    // jshint ignore:end
]).then(function([{app}]) { 
    app.register.controller('mainController', ['$scope', '$uiRouter', '$state', '$stateRegistry', function($scope, $uiRouter, $state, $stateRegistry) {

        console.log($uiRouter, $state, $stateRegistry);
        $scope.index = 'this is index';
    }]);

}).catch(function(err) {
    console.log(err);
}); 

/***/ })

});
//# sourceMappingURL=2.init.js.map