'use strict';

angular.module('app', ["ngRoute", "satellizer", "toastr"])
  .config(function($routeProvider, $authProvider) {

    var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    }];

    $routeProvider.when('/login', {
        templateUrl : 'views/login/index.html',
        controller : 'loginController',
        controllerAs: 'ctrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })
    .otherwise({ redirectTo: '/' });

    $authProvider.facebook({
      clientId: '212322639214701'
    });
  });

'use strict';

angular.module('app')
  .controller('loginController', ['$scope', '$auth', '$location', 'toastr', function($scope, $auth, $location, toastr) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          toastr.success('You have successfully signed in!');
          $location.path('/');
        })
        .catch(function(error) {
          toastr.error(error.data.message, error.status);
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/');
        })
        .catch(function(error) {
          if (error.message) {
            toastr.error(error.message);
          } else if (error.data) {
            toastr.error(error.data.message, error.status);
          } else {
            toastr.error(error);
          }
        });
    };
  }]);

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

'use strict';

angular.module('app')
  .controller('homeController', ['$scope', 'userService', function($scope, userService) {
      $scope.users = userService.getAll();
  }]);

'use strict';

angular.module('app')
  .factory('userFactory', function userFactory() {
      return {
        create: function (name, surname) {
          return {
            name: name,
            surname: surname
          };
        }
      };
  });

'use strict';

angular.module('app')
  .provider('userProvider', function() {
    function getAll() {
      return [
        {
          name: "name1",
          surname: "surname1"
        },
        {
          name: "name2",
          surname: "surname2"
        }
      ];
    }

    this.$get = function() {
      return {
        getAll: getAll
      };
    };
  });

'use strict';

angular.module('app')
  .service('userService', ['userFactory', 'userProvider', function(userFactory, userProvider) {
    this.getAll = function() {
      var users = userProvider.getAll();
      return users.map(function(user) {
        return userFactory.create(user.name, user.surname);
      });
    };
  }]);
