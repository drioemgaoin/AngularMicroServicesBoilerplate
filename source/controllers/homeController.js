'use strict';

angular.module('app')
  .controller('homeController', ['$scope', 'userService', function($scope, userService) {
      $scope.users = userService.getAll();
  }]);
