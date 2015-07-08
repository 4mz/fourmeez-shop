'use strict';

angular.module('app', ['ngMaterial', 'ngRoute', 'ngResource'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {controller: 'LoginCtrl', templateUrl: 'app/login/tmpl.html'})
    }]);