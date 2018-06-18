/*global angular*/
/*global c3*/


angular
    .module("managerApp")
    .controller("integration3Ctrl", ["$scope", "$http", function($scope, $http) {
        var res = [];
        var occupation = ['occupation'];
        var cancer = ['cancer'];
        var country = ['data3'];

        $http.get("https://sos1718-10.herokuapp.com/api/v1/buses").then(function(response) {
            res = response.data;



            $http.get("/api/v1/mortality-stats").then(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    for (var j = 0; j < res.length; j++) {
                        if (response.data[i].year == parseInt(res[j].year)) {
                            country.push(response.data[i].country);
                            occupation.push(res[j].occupation);
                            cancer.push(response.data[i].cancer);
                        }

                    }
                }

                var chart = c3.generate({
                    data: {
                        columns: [
                            occupation,
                            cancer

                        ],
                        types: {
                            data1: 'area-spline',
                            data2: 'area-spline'

                        },
                        groups: [
                            ['occupation', 'cancer']
                        ]
                    }
                });
            });
        });
    }]);
