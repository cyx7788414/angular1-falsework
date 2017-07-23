require(['src/main/css/login.scss']);
Promise.all([
    // jshint ignore:start
    import('src/init.js'),
    // jshint ignore:end
]).then(function([{app}]) {
    app.register.controller('loginController', ['$scope', 
        function($scope) {
            var init = function() {
                console.log('login');
                console.log($)
                console.log(_.chunk);
            };     
            
            init();                         
        }
    ]);

}).catch(function(err) {
    console.log(err);
}); 