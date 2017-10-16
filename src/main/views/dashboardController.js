Promise.all([
    // jshint ignore:start
    import('src/init.js'),
    import('src/../node_modules/angular-ui-bootstrap/src/dropdown')
    // jshint ignore:end
]).then(function([{app}, a]) {
    console.log(a);
    app.lazyModuleInject([a]);
    app.register.controller('dashboardController', ['$scope', 'uibDropdownService', 
        function($scope, uibDropdownService) {
            console.log(uibDropdownService);
            var init = function() {
            };     
            
            init();                         
        }
    ]);

}).catch(function(err) {
    console.log(err);
}); 