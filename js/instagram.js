angular.module('MyApp', [
])
.controller('InstagramController', function($scope, $http) {
    $scope.path = '../ins/';
    $http.get("../js/ins.json").success(function(response) {
        $scope.items = response.items;
        console.log(response);
    });
});
