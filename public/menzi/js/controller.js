var menziApp = angular.module('menziApp', []);

// menziApp.controller('menziController', function ($scope) {
//   $scope.gay = 
//     {"imageUrl": "../images/bili.gif"};

//   console.log('here2333');
// });

 menziApp.controller('menziController', ['$scope', '$http', function($scope, $http) {
  $http.get('data/a.json').success(function(data) {
    $scope.uPeiliaos = data;
  });
 $scope.gay =     {"imageUrl": "../images/bili.gif"};
 }]);

