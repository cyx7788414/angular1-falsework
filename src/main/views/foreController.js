Promise.all([
    // jshint ignore:start
    import('src/init.js'),
    // jshint ignore:end
]).then(function([{app}]) { 
    app.register.controller('foreController', ['$scope', function($scope) {

        
    }]);

}).catch(function(err) {
    console.log(err);
}); 