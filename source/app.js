'use strict';

angular.module('app', ["ngRoute"])
  .config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : 'views/home.html',
        controller : 'homeController',
        controllerAs: 'ctrl'
    })
    .otherwise({ redirectTo: '/' });
  });
