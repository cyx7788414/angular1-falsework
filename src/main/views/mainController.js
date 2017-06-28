Promise.all([
    // jshint ignore:start
    import('src/init.js'),
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