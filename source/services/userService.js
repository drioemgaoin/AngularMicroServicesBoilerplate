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
