'use strict';

angular.module('app', ['ngResource', 'ngMessages', 'ngAnimate', "ui.router", "satellizer", "toastr"])
  .config(function($stateProvider, $urlRouterProvider, $authProvider, routeProvider) {
    /* inject:routes */
    fs.readdirSync("./routes").forEach(function (file) {
      require(file, require('./routes' + file))($stateProvider, routeProvider);
    });
    /* endinject */

    $urlRouterProvider.otherwise

    $authProvider.facebook({
      clientId: '212322639214701'
    });

    $authProvider.google({
      clientId: '232678778980-v1o36t8rr4pufgs7nr207j29g7rnu414.apps.googleusercontent.com'
    });
  });
