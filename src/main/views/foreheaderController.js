require(['src/main/css/foreheader.scss']);
Promise.all([
    // jshint ignore:start
    import('src/init.js'),
    // jshint ignore:end
]).then(function([{app}]) { 
    app.register.controller('foreheaderController', ['$scope', '$state', 
        function($scope, $state) {
            $scope.toLogIn = function() {
                $state.go('index.fore.child', {page: 'login'});
            };

        	var init = function() {

            };
            
            init();
        }
    ]);

}).catch(function(err) {
    console.log(err);
}); 