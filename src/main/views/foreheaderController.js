Promise.all([
    // jshint ignore:start
    import('src/init.js'),
    // jshint ignore:end
]).then(function([{app}]) { 
    app.register.controller('foreheaderController', ['$scope', function($scope) {
    	console.log('xxxx');
        
    }]);

}).catch(function(err) {
    console.log(err);
}); 