'use strict';

module.exports = function($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      controller: 'homeController',
      templateUrl: 'views/home.html',
      controllerAs: "ctrl"
    });
};
