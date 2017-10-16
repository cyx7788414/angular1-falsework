import 'es6-promise/auto';

import 'bootstrap-loader';

import angular from 'angular';
import uiRoute from '@uirouter/angularjs';
//import uiBootstrap from 'angular-ui-bootstrap';
import ngCookies from 'angular-cookies';

import initConfig from 'src/main/js/initConfig';

//var app = angular.module('mainModule', ['ui.router', uiBootstrap, ngCookies]);
var app = angular.module('mainModule', ['ui.router', ngCookies]);

initConfig.init(app);


export {app};


