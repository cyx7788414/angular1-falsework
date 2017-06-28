import('src/init.js').then(function({app}) { // jshint ignore:line
    app.register.controller('testController', ['$scope', function($scope) {
        $scope.test = 'this is test';
    }]);
}).catch(function(err) {
    console.log(err);
});