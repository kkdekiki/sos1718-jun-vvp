/*global Chartist, angular*/

angular.module("managerApp").
controller("normal1Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var datos = [];
    var country = [];
    var suicide = [];
    var population = [];
    var name = [];

    $http
        .get("api/v1/mortality-stats").then(function(res) {
               for (var i = 0; i < res.data.length; i++) {
                    suicide.push(res.data[i].suicide);
                }

            $http
                .get("https://restcountries.eu/rest/v2/all")
                .then(function(response) {
                   for (var i = 0; i < response.data.length; i++) {

                    population.push(response.data[i].population);
                    name.push(response.data[i].name);
                }

                    var data = {
                        labels: [country[0], name[0]],
                        series: [suicide[0], population[0]]
                    };

                    var options = {
                        labelInterpolationFnc: function(value) {
                            return value[0]
                        }
                    };

                    var responsiveOptions = [
                        ['screen and (min-width: 640px)', {
                            chartPadding: 30,
                            labelOffset: 100,
                            labelDirection: 'explode',
                            labelInterpolationFnc: function(value) {
                                return value;
                            }
                        }],
                        ['screen and (min-width: 1024px)', {
                            labelOffset: 80,
                            chartPadding: 20
                        }]
                    ];

                    new Chartist.Pie('ct-chart', data, options, responsiveOptions);


                });

        });

}]);
