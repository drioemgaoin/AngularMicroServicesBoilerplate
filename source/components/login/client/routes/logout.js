'use strict';

module.exports = function($stateProvider, routeProvider) {
  $stateProvider
    .state('logout', {
      url: '/logout',
      template: null,
      controller: 'logoutController',
      controllerAs: "ctrl",
      resolve: {
        skipIfLoggedIn: routeProvider.loginRequired
      }
    });
};
