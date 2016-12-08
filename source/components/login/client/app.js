'use strict';

angular.module('app', ["ngRoute", "satellizer", "toastr"])
  .config(function($routeProvider, $authProvider) {

    var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    }];

    $routeProvider.when('/login', {
        templateUrl : 'views/login/index.html',
        controller : 'loginController',
        controllerAs: 'ctrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })
    .otherwise({ redirectTo: '/' });

    $authProvider.facebook({
      clientId: '212322639214701'
    });
  });
