'use strict';

angular.module('app', ['ngResource', 'ngMessages', 'ngAnimate', "ui.router", "satellizer", "toastr"])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
    /* inject:routes */
    fs.readdirSync("./routes").forEach(function (file) {
      require(file, require('./routes' + file))($stateProvider);
    });
    /* endinject */
  });
