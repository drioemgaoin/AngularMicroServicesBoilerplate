'use strict';

angular.module('app')
  .provider('route', function RouteProvider() {

    this.skipIfLoggedIn = function($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    };

    this.loginRequired = function($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    };

    this.$get = function() {
      return new RouteProvider();
    };
  });
