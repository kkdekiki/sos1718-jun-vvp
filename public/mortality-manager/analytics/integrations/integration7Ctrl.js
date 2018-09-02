/*global angular*/
/*global Plotly*/

angular
    .module("managerApp")
    .controller("integration7Ctrl", ["$scope", "$http", function($scope, $http) {
        var win = [];
        var age = [];
        var point = [];
        var suicide = [];
        var transport = [];

        $http.get("/integration7").then(function(response) {

            for (var j = 0; j < response.data.length; j++) {
                age.push(response.data[j].age);
                win.push(response.data[j].win);
                point.push(response.data[j].point);
            }



            $http.get("/api/v1/mortality-stats").then(function(response) {

                for (var i = 0; i < response.data.length; i++) {

                    transport.push(response.data[i].transport);
                    suicide.push(response.data[i].suicide);
                }

                var values = [
                    ['Win', 'Age', 'Points', 'Suicide', 'Transport'],
                    [win[0], age[0], point[0], suicide[0], transport[0]],
                    [win[1], age[1], point[1], suicide[1], transport[1]],
                    [win[2], age[2], point[2], suicide[2], transport[2]],
                    [win[3], age[3], point[3], suicide[3], transport[3]]]

                var data = [{
                    type: 'table',
                    header: {
                    values: [["VARIABLE"], ["Valores01"],["Valores02"], ["Valores03"], ["Valores04"]],
                    align: "center",
                    line: {width: 1, color: 'black'},
                    fill: {color: "grey"},
                    font: {family: "Arial", size: 12, color: "white"}
                },
                cells: {
                    values: values,
                    align: "center",
                    line: {color: "black", width: 1},
                    font: {family: "Arial", size: 11, color: ["black"]}
                }
                }]

                Plotly.plot('graph', data);
                
                });

            });

    }]);
