'use strict';

module.exports = function($stateProvider, routeProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'loginController',
      controllerAs: "ctrl",
      resolve: {
        skipIfLoggedIn: routeProvider.skipIfLoggedIn
      }
    });
};
