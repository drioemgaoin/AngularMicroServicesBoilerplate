'use strict';

angular.module('app')
  .controller('loginController', ['$scope', '$auth', '$location', 'toastr', function($scope, $auth, $location, toastr) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          toastr.success('You have successfully signed in!');
          $location.path('/');
        })
        .catch(function(error) {
          toastr.error(error.data.message, error.status);
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/');
        })
        .catch(function(error) {
          if (error.message) {
            toastr.error(error.message);
          } else if (error.data) {
            toastr.error(error.data.message, error.status);
          } else {
            toastr.error(error);
          }
        });
    };
  }]);
