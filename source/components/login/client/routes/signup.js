'use strict';

module.exports = function($stateProvider, routeProvider) {
  $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'signupController',
      controllerAs: "ctrl",
      resolve: {
        loginRequired: routeProvider.skipIfLoggedIn
      }
    });
};
