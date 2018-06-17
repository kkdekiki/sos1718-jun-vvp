/*global google, angular*/

angular.module("managerApp").
controller("normal4Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var datos = [];
    var countryv = [];
    var suicide = [];

    $http
        .get("api/v1/mortality-stats")
        .then(function(res) {
            

            function funciondatos2() {
                for (var i = 0; i < res.data.length; i++) {

                    var x = res.data[i];

                    countryv.push(x.country);
                    suicide.puch(x.suicide);

                }

            }
        });

    $http
        .get("https://restcountries.eu/rest/v2/all")
        .then(function(response) {
            datos = response.data;

            console.log(response.data);

        });

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable([

            [countryv[0], suicide[0]],
            [countryv[1], suicide[1]],
            [countryv[2], suicide[2]],
            [countryv[3], suicide[3]],
            [countryv[4], suicide[4]],
            [datos.name[0], datos.population[0]],
            [datos.name[1], datos.population[1]],
            [datos.name[2], datos.population[2]],
            [datos.name[3], datos.population[3]],
            [datos.name[4], datos.population[4]]
        ]);

        var options = {
            title: 'Populations and Suicide'
        };



    }

}]);
