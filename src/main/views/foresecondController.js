Promise.all([
    //jshint ignore:start
    import('src/init.js'),
    //jshint ignore:end
]).then(function([{app}]) {
    app.register.controller('foresecondController', ['$scope', 
        function($scope) {
            var init = function() {         

            };

            init();
        }
    ]);
}).catch(function(err) {
    console.log(err);
});