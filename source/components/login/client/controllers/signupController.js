'use strict';

angular.module('app')
  .controller('signupController', function($scope, $state, $auth, toastr) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          toastr.info('You have successfully created a new account and have been signed-in');
          $state.go('home');
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
    };
  });
