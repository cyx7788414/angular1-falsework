webpackJsonp([2],{

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

Promise.all([
    // jshint ignore:start
    new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 67)),
    // jshint ignore:end
]).then(function([{app}]) { 
    app.register.controller('mainController', ['$scope', '$uiRouter', '$state', '$stateRegistry', '$location', 
        function($scope, $uiRouter, $state, $stateRegistry, $location) {

            console.log($uiRouter, $state, $stateRegistry, $location);
            var init = function() {

            };

            init();
        }
    ]);

}).catch(function(err) {
    console.log(err);
}); 

/***/ })

});
//# sourceMappingURL=2.js.map