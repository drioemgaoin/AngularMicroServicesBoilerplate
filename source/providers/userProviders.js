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
