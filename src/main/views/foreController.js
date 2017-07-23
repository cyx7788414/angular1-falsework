require(['src/main/css/fore.scss']);
Promise.all([
    // jshint ignore:start
    import('src/init.js'),
    import('mockjs'),
    // jshint ignore:end
]).then(function([{app}, Mock]) {
    console.log(app, Mock, Mock.mock); 
    app.register.controller('foreController', ['$scope', function($scope) {
        var init = function() {
            console.log('fore');
        };     
        
        init();                         
    }]);

}).catch(function(err) {
    console.log(err);
}); 