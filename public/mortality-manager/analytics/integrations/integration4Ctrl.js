/*global angular,zingchart*/

angular.module("managerApp").
controller("integration4Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var res= [];
    var country = [];
    var adult = [];
    var suicide = [];
    $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < 3; i++) {
            country.push(response.data[i].country);
            adult.push(response.data[i].adult);
            suicide.push(0);

        }
        console.log(country, adult, suicide)
        $http.get("/api/v1/mortality-stats").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                for (var j = 0; j < res.length; j++) {
                    if (response.data[i].year == parseInt(res[j].year)) {
                        country.push(response.data[i].country);
                        adult.push(res[j].adult);
                        suicide.push(response.data[i].suicide);
                    }

                }
            }
            console.log(country, adult, suicide)



            zingchart.THEME = "classic";
            var myConfig = {
                "type": "line",


                "scale-x": {
                    "values": country,

                },

                "series": [{

                        "values": suicide,


                    },
                    {

                        "values": adult,

                    },

                ]
            };

            zingchart.render({
                id: 'myChart',
                data: myConfig,
                height: 500,
                width: 725
            });

        });
    });
}]);
