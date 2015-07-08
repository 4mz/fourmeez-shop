'use strict';

angular.module('app', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngResource'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {controller: 'LoginCtrl', templateUrl: 'app/login/tmpl.html'})
    }])
    .config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('orange');
    }]);