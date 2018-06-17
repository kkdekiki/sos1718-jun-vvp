/*global angular*/
/*global RGraph*/

angular
    .module("managerApp")
    .controller("corsCtrl", ["$scope", "$http", function($scope, $http) {
        var res = [];
        var capacity = [];
        var suicide = [];
        var country = [];

        $http.get("https://sos1718-01.herokuapp.com/api/v1/tvfees-stats").then(function(response) {

            for (var j = 0; j < response.data.length; j++) {
                capacity.push(response.data[j].capacity);
            }



            $http.get("/api/v1/mortality-stats").then(function(response) {

                for (var i = 0; i < response.data.length; i++) {

                    country.push(response.data[i].country);
                    suicide.push(response.data[i].suicide);
                }



                console.log(suicide);
                console.log(capacity);
                new RGraph.SVG.HBar({
                    id: 'chart-container',
                    data: [
                        [suicide[0], capacity[0]],
                        [suicide[1], capacity[1]],
                        [suicide[2], capacity[2]],
                        [suicide[3], capacity[3]]
                    ],
                    options: {
                        grouping: 'grouped',
                        yaxisLinewidth: 10,
                        yaxisLabels: [country[0], country[1], country[2], country[3]],
                        yaxisTextBold: true,
                        xaxisMax: 6,
                        xaxisLinewidth: 10,
                        xaxisLabelsCount: 0,

                        vmargin: 15,
                        vmarginGrouped: 2,

                        backgroundGrid: false,
                        colors: ['red', 'black'],
                        gutterLeftAutosize: false,
                        gutterLeft: 150
                    }
                }).wave();

            });
        });
    }]);
