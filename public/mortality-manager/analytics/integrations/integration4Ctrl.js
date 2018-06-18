/*global angular,zingchart*/

angular.module("managerApp").
controller("integration4Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
    var country = [];
    var totalself = [];
    var suicide = [];
    $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var j = 0; j < response.data.length; j++) {
                totalself.push(response.data[j].totalself);
            }
        console.log(country, totalself, suicide)
        $http.get("/api/v1/mortality-stats").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {

                    country.push(response.data[i].country);
                    suicide.push(response.data[i].suicide);
                }
            console.log(country, totalself, suicide)



            zingchart.THEME = "classic";
            var myConfig = {
                "type": "line",


                "scale-x": {
                    "values": country

                },

                "series": [{

                        "values": suicide


                    },
                    {

                        "values": totalself

                    },

                ]
            };

            zingchart.render({
                id: 'myChart100',
                data: myConfig,
                height: 500,
                width: 725
            });

        });
    });
}]);
