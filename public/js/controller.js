var phonecatControllers = angular.module('phonecatControllers', []);

//...

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', function ($scope, Phone) {
  var result = Phone.query();
  console.log(result);
  //var name;
  result.$promise.then(function (o) {
    console.log("data:-->" + o.data);
    console.log("name:-->" + o.name);
    //name = o.name;
  });
  //console.log('outer:' + name);
  $scope.phone = result;
}]);
