/*global angular*/
/*global c3*/


angular
    .module("managerApp")
    .controller("integration6Ctrl", ["$scope", "$http", function($scope, $http) {
        
        var rightfoot = ['rightfoot'];
        var suicide = ['suicide'];
        

        $http.get("https://sos1718-01.herokuapp.com/api/v1/goals-stats").then(function(response) {
            for (var j = 0; j < response.data.length; j++) {
                rightfoot.push(response.data[j].rightfoot);
                console.log(response.data);
            }
        



            $http.get("/api/v1/mortality-stats").then(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    suicide.push(response.data[i].suicide);
                    
                    console.log(suicide);
                    console.log(rightfoot);
                
                }
                var chart = c3.generate({
                    data: {
                        columns: [
                            ['rightfoot', rightfoot[0], rightfoot[1], rightfoot[2], rightfoot[3], rightfoot[4]],
                            ['suicide', suicide[0], suicide[1], suicide[2], suicide[3], suicide[4]]
                        ],
                        types: {
                            data1: 'step',
                            data2: 'area-step'
                        }
                    }
                });
            });
        });
    }]);
