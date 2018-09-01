/*global zingchart, angular*/

angular.module("managerApp").
controller("normal1Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {


    var suicide = [];
    var title = [];
   


    $http
        .get("api/v1/mortality-stats").then(function(res) {
            for (var i = 0; i < res.data.length; i++) {
                suicide.push(res.data[i].suicide);
                
            }

            $http
                .get("/normal1")
                .then(function(response) {
                    for (var i = 0; i < response.data.length; i++) {

                        title.push(response.data[i].title);
                       

                    }

                    zingchart.THEME = "classic";

                var myConfig = {
                    type: "pie",
                    backgroundColor: "#f1f1f1 #ffffff",
                    title: {
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
                            values: suicide[0],
                            text: title[0],
                            backgroundColor: "#2870B1"
                        },
                        {
                            values: suicide[1],
                            text: title[1],
                            backgroundColor: "#BB1FA8"
                        },
                        {
                            values: suicide[2],
                            text: title[2],
                            backgroundColor: "#7E971D"
                        },

                        {
                            values: suicide[3],
                            text: title[3],
                            backgroundColor: "#FFA72A"

                        },
                        {
                            values: suicide[4],
                            text: title[4],
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