'use strict';

/* jshint unused:false */
angular.module('app', ['ngAnimate', "ui.router"])
  .config(function($stateProvider, $urlRouterProvider) {
    /* inject:routes */
    /* endinject */

    $urlRouterProvider.otherwise('/');
  });
