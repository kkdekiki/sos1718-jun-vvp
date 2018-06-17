/*global angular*/

angular
    .module("managerApp")
    .controller("mortalityEditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("EditCotroller initialized");

        $scope.url = "/api/v1/mortality-stats";



        function refresh() {

            $http
                .get($scope.url + "/" + $routeParams.country)
                .then(function successCallback(response) {
                    $scope.updateStat = response.data[0];

                }, function errorCallback(response) {
                    console.log("Entra1");
                    $scope.updateStat = [];

                });
        }
        $scope.update = function(newStat) {
            $scope.newStat.transport = Number($scope.newStat.transport);
            $scope.newStat.suicide = Number($scope.newStat.suicide);
            $scope.newStat.cancer = Number($scope.newStat.cancer);
            

            $http
                .put($scope.url + "/" + newStat.country, {
                    country: newStat.country,
                    year: newStat.year,
                    transport: newStat.transport,
                    suicide: newStat.suicide,
                    cancer: newStat.cancer
                })
                .then(function(response) {
                    console.log("Stat Updated 2");
                    switch (response.status) {
                        case 400:
                            alert("Please fill all the fields");
                            break;
                        default:
                            alert("OK");
                            break;
                    }
                    $location.path("/");

                });
        };
        refresh();

    }]);