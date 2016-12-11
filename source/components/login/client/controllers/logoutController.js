'use strict';

angular.module('app')
  .controller('logoutController', function($location, $auth, toastr) {
    if (!$auth.isAuthenticated()) {
      return;
    }

    $auth.logout()
      .then(function() {
        toastr.info('You have been logged out');
        $location.path('/');
      });
  });
