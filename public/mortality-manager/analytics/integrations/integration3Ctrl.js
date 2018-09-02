/*global angular*/
/*global c3*/


angular
    .module("managerApp")
    .controller("integration3Ctrl", ["$scope", "$http", function($scope, $http) {
        
        var occupation = ['Occupation'];
        var cancer = ['Cancer'];
        

        $http.get("https://sos1718-10.herokuapp.com/api/v1/buses").then(function(response) {
            for (var j = 0; j < response.data.length; j++) {
                occupation.push(response.data[j].occupation);
                console.log(response.data);
            }
        



            $http.get("/api/v1/mortality-stats").then(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    cancer.push(response.data[i].cancer);
                    
                    console.log(cancer);
                    console.log(occupation);
                
                }
                var chart = c3.generate({
                    data: {
                        columns: [
                            occupation,
                            cancer

                        ],
                        types: {
                            data1: 'area',
                            data2: 'area'

                        },
                        groups: [
                            ['Occupation', 'Cancer']
                        ]
                    }
                });
            });
        });
    }]);
