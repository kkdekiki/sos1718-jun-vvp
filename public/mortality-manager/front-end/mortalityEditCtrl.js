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
        $scope.update = function(updateStat) {
            $scope.updateStat.transport = Number($scope.updateStat.transport);
            $scope.updateStat.suicide = Number($scope.updateStat.suicide);
            $scope.updateStat.cancer = Number($scope.updateStat.cancer);
            

            $http
                .put($scope.url + "/" + updateStat.country, {
                    country: updateStat.country,
                    year: updateStat.year,
                    transport: updateStat.transport,
                    suicide: updateStat.suicide,
                    cancer: updateStat.cancer
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
                    $location.path("/mortality");

                });
        };
        refresh();

    }]);