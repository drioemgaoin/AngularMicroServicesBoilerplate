'use strict';

angular.module('app')
  .controller('homeController', function($scope) {
    $scope.stars = 123;
    $scope.forks = 12;
    $scope.issues = 5;
  });
