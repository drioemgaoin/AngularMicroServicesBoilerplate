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
