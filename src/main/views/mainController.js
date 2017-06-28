Promise.all([
    // jshint ignore:start
    import('src/init.js'),
    // jshint ignore:end
]).then(function([{app}]) { 
    app.register.controller('mainController', ['$scope', '$uiRouter', '$state', '$stateRegistry', function($scope, $uiRouter, $state, $stateRegistry) {

        console.log($uiRouter, $state, $stateRegistry);
        $scope.index = 'this is index';
    }]);

}).catch(function(err) {
    console.log(err);
}); 