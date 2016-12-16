'use strict';

module.exports = function($stateProvider, routeProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      controller: 'homeController',
      templateUrl: 'views/home.html',
      controllerAs: "ctrl",
      resolve: {
        loginRequired: routeProvider.loginRequired
      }
    });
};
