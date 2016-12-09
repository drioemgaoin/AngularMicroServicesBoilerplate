var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
  var deferred = $q.defer();
  if ($auth.isAuthenticated()) {
    deferred.resolve();
  } else {
    $location.path('/login');
  }

  return deferred.promise;
}];

$routeProvider.when('/', {
    templateUrl : 'views/home.html',
    controller : 'homeController',
    controllerAs: 'ctrl',
    resolve: {
      loginRequired: loginRequired
    }
});
