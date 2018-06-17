/*global angular*/
/*global Plotly*/
/*global Highcharts*/
angular
    .module("managerApp")
    .controller("grupalCtrl", ["$http", "$scope", function($http, $scope) {


        var api1 = "https://sos1718-12.herokuapp.com/api/v2/taxes-stats";
        var api = "https://sos1718-12.herokuapp.com/api/v2/rape-stats";
        var mortality = "/api/v1/mortality-stats";
        var mortalitydata = [];
        var mortalitydata2 = [];
        var rate = [];
        var transports = [];
        var code = [];

        /****************************/

        $http
            .get(api1)
            .then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var x = response.data[i];
                    code.push(x.country_code.length);
                }
                console.log("el code es : " + code);
                var taxData = response.data;

                $http
                    .get(api)
                    .then(function(response) {

                        for (var j = 0; j < response.data.length; j++) {

                            var y = response.data[j];
                            rate.push(parseFloat(y.rate));

                        }
                        console.log("rape data : " + rate);

                        var rapeData = response.data;
                        var data1 = [];
                        var data2 = [];
                        var data3 = [];
                        var data4 = [];
                        var data5 = [];
                        taxData.map(function(d) {
                            data1.push(d['country']);
                        });

                        taxData.map(function(d) {
                            data3.push(Number(d['year']));
                        });

                        rapeData.map(function(d) {
                            data4.push(Number(d['year']));

                        });
                        rapeData.map(function(d) {
                            data5.push(Number(d['number-of-rape']));

                        });


                        $http.get(mortality).then(function(response) {

                            for (var f = 0; f < response.data.length; f++) {
                                var g = response.data[f];
                                transports.push(parseFloat(g.transport));
                            }

                            console.log("tranport data: " + transports);
                            var mortalityd = response.data;

                            mortalityd.map(function(d) {
                                mortalitydata.push(d['country']);

                            });
                            mortalityd.map(function(d) {
                                mortalitydata2.push(Number(d['year']));

                            });
                            var trace1 = {
                                x: data3,
                                y: data4,
                                mode: 'markers',
                                type: 'scatter',
                                name: 'Taxes-Stats(year,country)',
                                text: data1,
                                marker: { size: 12 }
                            };

                            var trace2 = {
                                x: data4,
                                y: data4,
                                mode: 'markers',
                                type: 'scatter',
                                name: 'Rape-Stats (year,Number of rape)',
                                text: data5,
                                marker: { size: 12 }
                            };
                            var trace3 = {
                                x: mortalitydata2,
                                y: data4,
                                mode: 'markers',
                                type: 'scatter',
                                name: 'mortality-Stats(year,country)',
                                text: mortalitydata,
                                marker: { size: 12 }
                            };

                            var data = [trace1, trace2, trace3];

                            var layout = {
                                xaxis: {
                                    range: data2
                                },
                                yaxis: {
                                    range: data3
                                },
                                title: 'Integracion Grupal'
                            };

                            Plotly.newPlot('grupal', data, layout);

                            Highcharts.chart('grupal2', {

                                title: {
                                    text: 'mortality & taxes & rapes'
                                },

                                subtitle: {
                                    text: ''
                                },

                                yAxis: {
                                    title: {
                                        text: 'number data'
                                    }
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'right',
                                    verticalAlign: 'middle'
                                },

                                plotOptions: {
                                    series: {
                                        label: {
                                            connectorAllowed: false
                                        },
                                        pointStart: 2003
                                    }
                                },
                                series: [{
                                    name: 'Rate Rape Data ',
                                    data: rate
                                }, {
                                    name: 'mortality transports',
                                    data: transports
                                }, {
                                    name: 'Taxes country code length',
                                    data: code
                                }],

                                responsive: {
                                    rules: [{
                                        condition: {
                                            maxWidth: 500
                                        },
                                        chartOptions: {
                                            legend: {
                                                layout: 'horizontal',
                                                align: 'center',
                                                verticalAlign: 'bottom'
                                            }
                                        }
                                    }]
                                }

                            });



                        });

                    });
            })
    }]);
