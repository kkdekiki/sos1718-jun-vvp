/*global google, angular*/

angular.module("managerApp").
controller("normal1Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {


    var country = [];
    var suicide = [];
    var transport = [];
    var cancer = [];
    var title = [];


    $http
        .get("api/v1/mortality-stats").then(function(res) {
            for (var i = 0; i < res.data.length; i++) {
                suicide.push(res.data[i].suicide);
                transport.push(res.data[i].transport);
                cancer.push(res.data[i].cancer);
            }

            $http
                .get("https://www.metaweather.com/api/location/search/?query=san")
                .then(function(response) {
                    for (var i = 0; i < response.data.length; i++) {

                        title.push(response.data[i].title);

                    }

                    google.charts.load('current', { 'packages': ['corechart'] });
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {

                        var data = google.visualization.arrayToDataTable([
                            
                            [title[0], suicide[0]],
                            [title[0], transport[0]],
                            [title[0], cancer[0]],
                            [title[1], suicide[1]],
                            [title[1], transport[1]],
                            [title[1], cancer[1]],
                            
                            
                        ]);

                        var options = {
                            title: 'Stats'
                        };

                        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

                        chart.draw(data, options);
                    }

                });

        });

}]);
