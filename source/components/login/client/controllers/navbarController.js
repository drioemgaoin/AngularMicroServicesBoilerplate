'use strict';

angular.module('app')
  .controller('navbarController', function($scope, $auth) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  });
