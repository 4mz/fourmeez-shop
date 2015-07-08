'use strict';

angular.module('app')
    .controller('LoginCtrl', ['$scope', '$location', function ($scope, $location) {

        $scope.login = function () {
            $location.path('/shop');
        }

    }]
);