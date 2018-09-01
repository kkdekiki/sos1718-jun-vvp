/*global zingchart, angular*/

angular.module("managerApp").
controller("normal1Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {


    var country = [];
    var age = [];
   


    $http
        .get("api/v1/mortality-stats").then(function(res) {
            for (var i = 0; i < res.data.length; i++) {
                country.push(res.data[i].country);
                
            }

            $http
                .get("https://sos1718-10.herokuapp.com/api/v1/motogp-stats").then(function(res) {
            for (var i = 0; i < res.data.length; i++) {
                age.push(res.data[i].age);
                       

                    }

                    zingchart.THEME = "classic";

                var myConfig = {
                    type: "pie",
                    backgroundColor: "#f1f1f1 #ffffff",
                    age: {
                        text: "Countries Population",
                        backgroundColor: "#052C4E"
                    },
                    
                    legend: {
                        layout: "h",
                        align: "center",
                        verticalAlign: "bottom",
                        toggleAction: "remove",
                        header: {
                            text: "County",
                            backgroundColor: "#052C4E"
                        },
                        shadow: 0
                    },
                    plotarea: {
                        y: 150
                    },
                    plot: {
                        refAngle: 180,
                        size: 250,
                        valueBox: {
                            placement: "in",
                            offsetR: 20
                        }
                    },
                    scaleR: {
                        aperture: 180
                    },
                    tooltip: {
                        text: "%t<br>Deliveries: %v<br>Percent of Shirt %npv%",
                        textAlign: "left",
                        shadow: 0,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: "#fff"
                    },
                    series: [{
                            values: country[0],
                            text: age[0],
                            backgroundColor: "#2870B1"
                        },
                        {
                            values: country[1],
                            text: age[1],
                            backgroundColor: "#BB1FA8"
                        },
                        {
                            values: country[2],
                            text: age[2],
                            backgroundColor: "#7E971D"
                        },

                        {
                            values: country[3],
                            text: age[3],
                            backgroundColor: "#FFA72A"

                        },
                        {
                            values: country[4],
                            text: age[4],
                            backgroundColor: "#54004A"
                        }
                    ]
                };

                zingchart.render({
                    id: 'myChart',
                    data: myConfig,
                });


            });

        });
    }]);