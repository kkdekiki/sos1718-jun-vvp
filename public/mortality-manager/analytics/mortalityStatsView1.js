/*global angular*/
/*global google*/
/*global Highcharts*/

angular
    .module("managerApp")
    .controller("mortalityStatsView1", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
        console.log("Controller initialized");
        $http
            .get("/api/v1/mortality-stats")
            .then(function(response) {


                google.charts.load('current', {
                    'packages': ['geochart'],
                    'mapsApiKey': "AIzaSyCXG8oC2k-nM18JMXiW0asnu6UJ8wLYCVA"

                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var finalData = [
                        ['Country', 'Mortality-Transport', 'Mortality-Suicide', 'Mortality-Cancer']
                    ];

                    console.log(response.data);
                    response.data.forEach(function(item) {
                        finalData.push([item.country, Number(item.transport), Number(item.suicide), Number(item.cancer)]);
                    });


                    var data = google.visualization.arrayToDataTable(finalData);
                    console.log(data);

                    var options = {
                        region: '150',

                        colorAxis: {
                            colors: ['#58ACFA', '#B40431']
                        }
                    };


                    var chart = new google.visualization.GeoChart(document.getElementById('mortalityStatsView1'));

                    chart.draw(data, options);
                }

                var country = [];
                var transport = [];
                var suicide = [];
                var cancer = [];

                response.data.forEach((x) => {
                    country.push(x.country);
                    transport.push(x.transport);
                    suicide.push(x.suicide);
                    cancer.push(x.cancer);
                });
                

                Highcharts.chart('container', {
                    chart: {
                        type: 'area',
                        spacingBottom: 30
                    },
                    title: {
                        text: 'Mortality Stats in 2013'
                    },

                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        verticalAlign: 'top',
                        x: 150,
                        y: 100,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                    },
                    xAxis: {
                        categories: country

                    },
                    yAxis: {
                        title: {
                            text: 'Mortality %'
                        },
                        labels: {
                            formatter: function() {
                                return this.value;
                            }
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            return '<b>' + this.series.name + '</b><br/>' +
                                this.x + ': ' + this.y;
                        }
                    },
                    plotOptions: {
                        area: {
                            fillOpacity: 0.5
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Mortality-Transport',
                        data: transport
                    }, {
                        name: 'Mortality-Suicide',
                        data: suicide
                    }, {
                        name: 'Mortality-Cancer',
                        data: cancer
                    }]
                });
            });
            
            
            
            $http.get("/api/v1/mortality-stats")
            .then(function (response) {
                var stats = [];
                var cont = 0;
                
                response.data.forEach((x) => {
                    stats.push({
                        id: cont,
                        content: String(x.cancer),
                        start: x.year+"-01-01",
                        end: x.year+"-12-31"
                    });
                    cont++;
                });
                console.log(stats);
                var container = document.getElementById('visualization');

                // Create a DataSet (allows two way data-binding)
                var items = new vis.DataSet(
                   stats
                );

                // Configuration for the Timeline
                var options = {};

                // Create a Timeline
                var timeline = new vis.Timeline(container, items, options);
            });
}]);