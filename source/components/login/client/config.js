var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
  var deferred = $q.defer();
  if ($auth.isAuthenticated()) {
    deferred.reject();
  } else {
    deferred.resolve();
  }

  return deferred.promise;
}];

var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }];

$stateProvider
  .state('home', {
    url: '/',
    controller: 'homeController',
    templateUrl: 'views/home.html',
    controllerAs: "ctrl",
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'loginController',
    controllerAs: "ctrl",
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'views/signup.html',
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
