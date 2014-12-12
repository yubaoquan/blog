var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function ($resource) {
    return $resource('ajax', {}, {
      query: {method : 'GET', params : {}}
    });
  }]);