/*global Highcharts, angular*/

angular.module("managerApp").
controller("normal2Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var datos = [];
    var datos1 = [];
    var countryv = [];
    var transport = [];

    $http
        .get("api/v1/mortality-stats")
        .then(function(res) {


            for (var i = 0; i < res.data.length; i++) {

                var x = res.data[i];

                countryv.push(x.country);
                transport.push(x.transport);



            }
        });
    $http
        .get("https://api.carbonintensity.org.uk/intensity/date")
        .then(function(response) {
                            console.log("aaaaa");

            for (var i = 0; i < response.data.data.length; i++) {

                var x = response.data.data[i];
                datos1.push(Number(x.intensity.actual));
            }

            console.log(datos1);
            console.log(transport);


            Highcharts.chart('container', {
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Transport and Intesity actual to carbon'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Data'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'Data'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 100,
                    y: 70,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                    borderWidth: 1
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.x} data, {point.y} data'
                        }
                    }
                },
                series: [{
                    name: 'Intensity Actual to Carbon',
                    color: 'rgba(223, 83, 83, .5)',
                    data: datos1

                }, {
                    name: 'Transport Mortality',
                    color: 'rgba(119, 152, 191, .5)',
                    data: transport
                }]
            });




        });


}]);
