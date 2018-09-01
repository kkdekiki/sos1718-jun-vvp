/*global zingchart, angular*/

angular.module("managerApp").
controller("normal1Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {


      $http.get("api/v1/mortality-stats").then(function(responseBuses) {
            $http.get("https://sos1718-10.herokuapp.com/api/v1/motogp-statsl").then(function(responseRest) {
               
                var age = [];
                var country=[];

                for (var i = 0; i < 5; i++) {



                    age.push([responseRest.data[i].age]);
                    country.push(responseRest.data[i].country);
                    


                }
        
         

                    zingchart.THEME = "classic";

                var myConfig = {
                    type: "pie",
                    backgroundColor: "#f1f1f1 #ffffff",
                    age: {
                        text: "Countries age",
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
                            values: age[0],
                            text: country[0],
                            backgroundColor: "#2870B1"
                        },
                        {
                            values: age[1],
                            text: country[1],
                            backgroundColor: "#BB1FA8"
                        },
                        {
                            values: age[2],
                            text: country[2],
                            backgroundColor: "#7E971D"
                        },

                        {
                            values: age[3],
                            text: country[3],
                            backgroundColor: "#FFA72A"

                        },
                        {
                            values: age[4],
                            text: country[4],
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