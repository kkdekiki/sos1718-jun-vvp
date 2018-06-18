/*global Chartist, angular*/

angular.module("managerApp").
controller("normal1Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var datos = [];
    var country = [];
    var suicide = [];
    var population = [];
    var name = [];

    $http
        .get("api/v1/mortality-stats")
        .then(function(res) {



            for (var i = 0; i < res.data.length; i++) {

                var x = res.data[i];

                country.push(x.country);
                suicide.push(x.suicide);

            }

            $http
                .get("https://restcountries.eu/rest/v2/all")
                .then(function(response) {
                    for (var j = 0; j < 2; j++) {
                        var y = response.data[j];
                        population.push(Number(y.population));
                        name.push(y.name);
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

                    new Chartist.Pie('.ct-chart', data, options, responsiveOptions);


                });

        });

}]);
