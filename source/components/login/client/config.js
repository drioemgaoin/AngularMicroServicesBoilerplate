var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
  var deferred = $q.defer();
  if ($auth.isAuthenticated()) {
    deferred.reject();
  } else {
    deferred.resolve();
  }

  return deferred.promise;
}];

$stateProvider
  .state('home', {
    url: '/',
    controller: 'homeController',
    templateUrl: 'views/login/home.html',
    controllerAs: "ctrl"
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login/login.html',
    controller: 'loginController',
    controllerAs: "ctrl",
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'views/login/signup.html',
    controller: 'signupController',
    controllerAs: "ctrl",
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .state('logout', {
    url: '/logout',
    template: null,
    controller: 'logoutController',
    controllerAs: "ctrl"
  });

$urlRouterProvider.otherwise('/');

$authProvider.facebook({
  clientId: '212322639214701'
});
