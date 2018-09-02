/*global RGraph, angular*/

angular.module("managerApp").
controller("normal2Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var datos = [];

    var country = [];
    var suicide = [];
    var cancer = [];

    $http
        .get("api/v1/mortality-stats")
        .then(function(res) {


            for (var i = 0; i < res.data.length; i++) {

                var x = res.data[i];

                country.push(x.country);
                suicide.push(x.suicide);
                cancer.push(x.cancer);

            }


            $http
                .get("https://ipapi.co/8.8.8.8/json/")
                .then(function(response) {
                    datos = response.data;

                    console.log(response.data);


                    new RGraph.SVG.Rose({
                        id: 'chart-container',
                        data: [
                            [
                                [suicide[0]], cancer[0]
                            ],
                            [
                                [suicide[1]], cancer[1]
                            ],
                            [
                                [suicide[2]], cancer[2]
                            ],
                            [
                                [suicide[3]], cancer[3]
                            ],
                            [
                                [suicide[4]], cancer[4]
                            ],
                            [
                                [datos.latitude], cancer[4]
                            ]
                        ],
                        options: {
                            backgroundGridRadialsCount: 0,
                            colorsOpacity: 0.8,
                            colors: ['red', 'blue', '#f6f'],
                            strokestyle: 'rgba(0,0,0,0)',
                            linewidth: 1,
                            variant: 'non-equi-angular',
                            margin: 0.05,
                            labels: [country[0], country[1], country[2], country[3], country[4], datos.region],
                            tooltips: [
                                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                                'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                                'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'bb', 'cc', 'dd'
                            ]
                        }
                    }).draw();

                });


        });


}]);
