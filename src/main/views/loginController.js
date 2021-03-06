require(['src/main/css/login.scss']);
Promise.all([
    // jshint ignore:start
    import('src/init.js'),
    // jshint ignore:end
]).then(function([{app}]) {
    app.register.controller('loginController', ['$scope', '$state', 
        function($scope, $state) {
            $scope.login = function() {
                $state.go('index.major');
            };

            var init = function() {

            };     
            
            init();                         
        }
    ]);

}).catch(function(err) {
    console.log(err);
}); 